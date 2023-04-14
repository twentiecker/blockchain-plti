const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('../p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('./miner');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);

app.use(bodyParser.json());
app.use(express.json);

app.get('/blocks', (req, res) => {
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
  res.json(tp.transactions);
});

app.post('/transact', (req, res) => {
  const {
    recipient,
    k11 = 0,
    k21 = 0,
    k31 = 0,
    amount1 = k11 || k21 || k31 ? 1 : 0,
    k12 = 0,
    k22 = 0,
    k32 = 0,
    amount2 = k12 || k22 || k32 ? 1 : 0,
  } = req.body;

  const transaction = wallet.createTransaction(
    recipient,
    amount1,
    k11,
    k21,
    k31,
    amount2,
    k12,
    k22,
    k32,
    bc,
    tp
  );
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
});
