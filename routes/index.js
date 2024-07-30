const express = require('express');
const productRoute = require('./product.router');
const authRoute = require('./auth.router');
const reviewRoute = require('./reviews.router');

const router = express.Router();

router.use('/product', productRoute);
router.use('/auth', authRoute);
router.use('/review', reviewRoute);

module.exports = router;
