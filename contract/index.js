const Blockchain = require('../blockchain');
const bc = new Blockchain();

class TrContract {
  constructor() {
    this.id = '001';
  }

  loadChain() {
    return bc.chain;
  }

  loadTransactions(transactionPool) {
    return transactionPool.transactions;
  }

  doTransaction(recipient, amount, blockchain, transactionPool, contractCode) {
    wallet.balance = wallet.calculateBalance(blockchain);
    if (amount > wallet.balance) {
      console.log(`Amount: ${amount}, exceeds current balance:
    ${wallet.balance}`);
      return;
    }
    let transaction = transactionPool.existingTransaction(wallet.publicKey);
    if (transaction) {
      transaction.update(wallet, recipient, amount, contractCode);
    } else {
      transaction = Transaction.newTransaction(
        wallet,
        recipient,
        amount,
        contractCode
      );
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }
}

module.exports = TrContract;
