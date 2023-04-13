const ChainUtil = require('../chain-util');
const { MINING_REWARD } = require('../config.js');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static transactionWithOutputs(senderWallet, outputs) {
    const transaction = new this();
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  // static rewardTransaction(minerWallet, blockchainWallet) {
  //   return Transaction.transactionWithOutputs(blockchainWallet, [
  //     {
  //       amount: MINING_REWARD,
  //       address: minerWallet.publicKey,
  //     },
  //   ]);
  // }

  // static newTransaction(senderWallet, recipient, amount, contractCode) {
  static newTransaction(senderWallet, recipient, amount, k1, k2, k3) {
    // if (amount > senderWallet.balance) {
    //   console.log(`Amount: ${amount} exceeds balance.`);
    //   return;
    // }
    // 106;
    return Transaction.transactionWithOutputs(senderWallet, [
      {
        amount: senderWallet.balance - amount,
        k1: senderWallet.k1 + k1,
        k2: senderWallet.k2 + k2,
        k3: senderWallet.k3 + k3,
        address: senderWallet.publicKey,
      },
      { amount, k1, k2, k3, address: recipient },
      // { amount, address: recipient, contractCode },
    ]);
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      k1: senderWallet.k1,
      k2: senderWallet.k2,
      k3: senderWallet.k3,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs)),
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }

  update(senderWallet, recipient, amount, k1, k2, k3) {
    const senderOutput = this.outputs.find(
      (output) => output.address === senderWallet.publicKey
    );
    // if (amount > senderOutput.amount) {
    //   console.log(`Amount: ${amount} exceeds balance.`);
    //   return;
    // }
    senderOutput.amount = senderOutput.amount - amount;
    senderOutput.k1 = senderOutput.k1 + k1;
    senderOutput.k2 = senderOutput.k2 + k2;
    senderOutput.k3 = senderOutput.k3 + k3;
    this.outputs.push({ amount, k1, k2, k3, address: recipient });
    Transaction.signTransaction(this, senderWallet);
    return this;
  }
}
module.exports = Transaction;
