const express = require('express');
const productRoute = require('./product.router');
const authRoute = require('./auth.router');
const reviewRoute = require('./reviews.router');
const orderRoute = require('./order.router');
const adminRoute = require('./admin.router');

const router = express.Router();

router.use('/product', productRoute);
router.use('/auth', authRoute);
router.use('/review', reviewRoute);
router.use('/order', orderRoute);
router.use('/admin', adminRoute);

module.exports = router;
