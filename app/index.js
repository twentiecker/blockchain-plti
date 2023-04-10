const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('../p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('./miner');
// const TrContract = require('../contract');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);
// const sc = new TrContract();

// let contractCode = null;
// fs.readFile(__dirname + '/../contract/index.js', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     console.log('Current directory:', __dirname);
//     return;
//   }
//   contractCode = data;
// });

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  // res.json(sc.loadChain);
  res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));

p2pServer.listen();

app.get('/public-key', (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});

app.get('/transactions', (req, res) => {
  // res.json(sc.loadTransactions(tp));
  res.json(tp.transactions);
});

app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  // const transaction = sc.doTransaction(recipient, amount, bc, tp, contractCode);
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
});
