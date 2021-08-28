const { Router } = require('express');

const router = Router();

const ALLOWED_TOKENS = ["ETH", "USDT", "DVF"];

router.get('/', async (req, res) => {
  console.log("GET /balance/");
  res.send({ message: "OK" });
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

  res.send({ message: "OK" });
});

module.exports = router;