const { Router } = require('express');
const auth = require('../utils/auth');
const { getBalances, deposit } = require("../utils/utils.balances");

const router = Router();

const ALLOWED_TOKENS = ["ETH", "USDT", "DVF"];

router.use(auth.checkSignature);

router.get('/', async (req, res, next) => {
  console.log("GET /balance/");
  try {
    const balances = getBalances();
    res.send({ message: "OK", balances });
  } catch (e) {
    next(e);
  }
});

router.post('/deposit', async (req, res) => {
  console.log("POST /balance/deposit");
  const { amount, token } = req.body;

  if (!amount) {
    return res.status(400).send({ message: "Amount is required" });
  }

  if (!token || !ALLOWED_TOKENS.includes(token)) {
    return res
      .status(400)
      .send({ message: "Token is missing or your trying with wrong token" });
  }

  const balances = deposit(amount, token);

  res.send({ message: "OK", balances });
});

module.exports = router;