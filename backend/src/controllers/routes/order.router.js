"use strict";
const { Router } = require('express');

const router = Router();

router.get('/all', async (req, res) => {
  console.log("GET /order/all");
  res.send({ message: "OK" });
});

router.post('/', async (req, res) => {
  console.log("POST /order/");
  const { type, amount, token, price } = req.body;

  console.log(`PLACED[${type}] @ [${price}] [${amount}]`);

  res.send({ message: "OK" });
});

router.delete('/:id', async (req, res) => {
  console.log("DELETE /order/");
  const id = req.params.id;

  console.log(`CANCELLED[${type}] @ [${price}] [${amount}]`);

  res.send({ message: "OK" });
});

module.exports = router;