const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');

class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    // validTransactions.push(
    //   Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
    // );
    const block = this.blockchain.addBlock(validTransactions);
    this.p2pServer.syncChains();
    this.transactionPool.clear();
    this.p2pServer.broadcastClearTransactions();
    return block;
  }

  // validTransactions() {
  //   return this.transactions.filter((transaction) => {
  //     const outputTotal = transaction.outputs.reduce((total, output) => {
  //       return total + output.amount;
  //     }, 0);
  //     if (transaction.input.amount !== outputTotal) {
  //       console.log(`Invalid transaction from ${transaction.input.address}.`);
  //       return;
  //     }
  //     if (!Transaction.verifyTransaction(transaction)) {
  //       console.log(`Invalid signature from ${transaction.input.address}.`);
  //       return;
  //     }
  //     return transaction;
  //   });
  // }
}
module.exports = Miner;
