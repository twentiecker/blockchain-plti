const ChainUtil = require('../chain-util');

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

  static newTransaction(
    senderWallet,
    recipient,
    amount1,
    k11,
    k21,
    k31,
    amount2,
    k12,
    k22,
    k32
  ) {
    return Transaction.transactionWithOutputs(senderWallet, [
      {
        amount1: senderWallet.balance - amount1,
        k11: senderWallet.k11 + k11,
        k21: senderWallet.k21 + k21,
        k31: senderWallet.k31 + k31,
        amount2: senderWallet.balance2 - amount2,
        k12: senderWallet.k12 + k12,
        k22: senderWallet.k22 + k22,
        k32: senderWallet.k32 + k32,
        address: senderWallet.publicKey,
      },
      { amount1, k11, k21, k31, amount2, k12, k22, k32, address: recipient },
    ]);
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount1: senderWallet.balance,
      k11: senderWallet.k11,
      k21: senderWallet.k21,
      k31: senderWallet.k31,
      amount2: senderWallet.balance2,
      k12: senderWallet.k12,
      k22: senderWallet.k22,
      k32: senderWallet.k32,
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

  update(
    senderWallet,
    recipient,
    amount1,
    k11,
    k21,
    k31,
    amount2,
    k12,
    k22,
    k32
  ) {
    const senderOutput = this.outputs.find(
      (output) => output.address === senderWallet.publicKey
    );

    senderOutput.amount1 = senderOutput.amount1 - amount1;
    senderOutput.k11 = senderOutput.k11 + k11;
    senderOutput.k21 = senderOutput.k21 + k21;
    senderOutput.k31 = senderOutput.k31 + k31;
    senderOutput.amount2 = senderOutput.amount2 - amount2;
    senderOutput.k12 = senderOutput.k12 + k12;
    senderOutput.k22 = senderOutput.k22 + k22;
    senderOutput.k32 = senderOutput.k32 + k32;

    this.outputs.push({
      amount1,
      k11,
      k21,
      k31,
      amount2,
      k12,
      k22,
      k32,
      address: recipient,
    });
    Transaction.signTransaction(this, senderWallet);
    return this;
  }
}

module.exports = Transaction;
