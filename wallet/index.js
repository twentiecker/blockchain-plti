const {
  INITIAL_BALANCE,
  INITIAL_COUNT,
  INITIAL_BALANCE_2,
} = require('../config');
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const Blockchain = require('../blockchain');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.k11 = INITIAL_COUNT;
    this.k21 = INITIAL_COUNT;
    this.k31 = INITIAL_COUNT;
    this.balance2 = INITIAL_BALANCE_2;
    this.k12 = INITIAL_COUNT;
    this.k22 = INITIAL_COUNT;
    this.k32 = INITIAL_COUNT;
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
    amount1,
    k11,
    k21,
    k31,
    amount2,
    k12,
    k22,
    k32,
    blockchain,
    transactionPool
  ) {
    this.balance = this.calculateBalance(blockchain);
    this.k11 = this.calculateK11(blockchain);
    this.k21 = this.calculateK21(blockchain);
    this.k31 = this.calculateK31(blockchain);
    this.balance2 = this.calculateBalance2(blockchain);
    this.k12 = this.calculateK12(blockchain);
    this.k22 = this.calculateK22(blockchain);
    this.k32 = this.calculateK32(blockchain);

    let transaction = transactionPool.existingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(
        this,
        recipient,
        amount1,
        k11,
        k21,
        k31,
        amount2,
        k12,
        k22,
        k32
      );
    } else {
      transaction = Transaction.newTransaction(
        this,
        recipient,
        amount1,
        k11,
        k21,
        k31,
        amount2,
        k12,
        k22,
        k32
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
      ).amount1;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.amount1;
          }
        });
      }
    });
    return balance;
  }

  calculateK11(blockchain) {
    let k11 = this.k11;
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
      k11 = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).k11;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.k11;
          }
        });
      }
    });
    return k11;
  }

  calculateK21(blockchain) {
    let k21 = this.k21;
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
      k21 = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).k21;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.k21;
          }
        });
      }
    });
    return k21;
  }

  calculateK31(blockchain) {
    let k31 = this.k31;
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
      k31 = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).k31;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.k31;
          }
        });
      }
    });
    return k31;
  }

  calculateBalance2(blockchain) {
    let balance = this.balance2;
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
      ).amount2;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.amount2;
          }
        });
      }
    });
    return balance;
  }

  calculateK12(blockchain) {
    let k12 = this.k12;
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
      k12 = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).k12;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.k12;
          }
        });
      }
    });
    return k12;
  }

  calculateK22(blockchain) {
    let k22 = this.k22;
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
      k22 = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).k22;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.k22;
          }
        });
      }
    });
    return k22;
  }

  calculateK32(blockchain) {
    let k32 = this.k32;
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
      k32 = recentInputT.outputs.find(
        (output) => output.address === this.publicKey
      ).k32;
      startTime = recentInputT.input.timestamp;
    }
    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find((output) => {
          if (output.address === this.publicKey) {
            balance -= output.k32;
          }
        });
      }
    });
    return k32;
  }
}

module.exports = Wallet;
