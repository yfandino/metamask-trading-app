"use strict";
const { Router } = require('express');
const OrderRouter = require('./routes/order.router');
const BalanceRouter = require('./routes/balance.router');

const router = Router();

router.use("/order", OrderRouter);
router.use("/balance", BalanceRouter);

module.exports = router;