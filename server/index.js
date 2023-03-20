const express = require("express");
const app = express();
const cors = require("cors");
const { createNewWallet } = require("./utils/general");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address].balance || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, key, recipient, amount } = req.body;

  if (balances[sender].privateKey !== key) {
    res.status(400).send({ message: "Invalid key!" });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender].balance < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender].balance -= amount;
    balances[recipient].balance += amount;
    res.send({ balance: balances[sender].balance });
  }
});

app.get("/create-new-wallet", (req, res) => {
  const { privateKey, publicKey } = createNewWallet();

  balances[publicKey] = {
    privateKey,
    publicKey,
    balance: 100,
  };

  res.json({ privateKey, publicKey });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address].balance) {
    balances[address] = 0;
  }
}
