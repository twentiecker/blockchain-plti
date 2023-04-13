const { INITIAL_BALANCE, INITIAL_COUNT } = require('../config');
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const Blockchain = require('../blockchain');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.k1 = INITIAL_COUNT;
    this.k2 = INITIAL_COUNT;
    this.k3 = INITIAL_COUNT;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance : ${this.balance}`;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(
    recipient,
    amount,
    k1,
    k2,
    k3,
    blockchain,
    transactionPool
  ) {
    this.balance = this.calculateBalance(blockchain);
    this.k1 = this.calculateK1(blockchain);
    this.k2 = this.calculateK2(blockchain);
    this.k3 = this.calculateK3(blockchain);
    // if (amount > this.balance) {
    //   console.log(
    //     `Amount: ${amount}, exceeds current balance: ${this.balance}`
    //   );
    //   return;
    // }
    let transaction = transactionPool.existingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, recipient, amount, k1, k2, k3);
    } else {
      transaction = Transaction.newTransaction(
        this,
        recipient,
        amount,
        k1,
        k2,
        k3
      );
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.address = 'blockchain-wallet';
    return blockchainWallet;
  }

  calculateBalance(blockchain) {
    let balance = this.balance;
    let transactions = [];
    console.log(blockchain.chain);
    blockchain.chain.forEach((block) =>
      block.data.forEach((transaction) => {
        transactions.push(transaction);
      })
    );
    const walletInputTs = transactions.filter(
      (transaction) => transaction.input.address === this.publicKey
    );
    let startTime = 0;
    if (walletInputTs.length > 0) {
      const recentInputT = walletInputTs.reduce((prev, current) =>
        prev.input.timestamp > current.input.timestamp ? prev : current
      );
      balance = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).amount;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.amount;
          }
        });
      }
    });
    return balance;
  }

  calculateK1(blockchain) {
    let k1 = this.k1;
    let transactions = [];
    console.log(blockchain.chain);
    blockchain.chain.forEach((block) =>
      block.data.forEach((transaction) => {
        transactions.push(transaction);
      })
    );
    const walletInputTs = transactions.filter(
      (transaction) => transaction.input.address === this.publicKey
    );
    let startTime = 0;
    if (walletInputTs.length > 0) {
      const recentInputT = walletInputTs.reduce((prev, current) =>
        prev.input.timestamp > current.input.timestamp ? prev : current
      );
      k1 = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).k1;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.k1;
          }
        });
      }
    });
    return k1;
  }

  calculateK2(blockchain) {
    let k2 = this.k2;
    let transactions = [];
    console.log(blockchain.chain);
    blockchain.chain.forEach((block) =>
      block.data.forEach((transaction) => {
        transactions.push(transaction);
      })
    );
    const walletInputTs = transactions.filter(
      (transaction) => transaction.input.address === this.publicKey
    );
    let startTime = 0;
    if (walletInputTs.length > 0) {
      const recentInputT = walletInputTs.reduce((prev, current) =>
        prev.input.timestamp > current.input.timestamp ? prev : current
      );
      k2 = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).k2;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.k2;
          }
        });
      }
    });
    return k2;
  }

  calculateK3(blockchain) {
    let k3 = this.k3;
    let transactions = [];
    console.log(blockchain.chain);
    blockchain.chain.forEach((block) =>
      block.data.forEach((transaction) => {
        transactions.push(transaction);
      })
    );
    const walletInputTs = transactions.filter(
      (transaction) => transaction.input.address === this.publicKey
    );
    let startTime = 0;
    if (walletInputTs.length > 0) {
      const recentInputT = walletInputTs.reduce((prev, current) =>
        prev.input.timestamp > current.input.timestamp ? prev : current
      );
      k3 = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).k3;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.k3;
          }
        });
      }
    });
    return k3;
  }
}

module.exports = Wallet;
