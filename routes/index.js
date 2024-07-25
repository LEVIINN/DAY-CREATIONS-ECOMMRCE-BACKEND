const express = require('express');
const productRoute = require('./product.router');
const authRoute = require('./auth.router');

const router = express.Router();

router.use('/product', productRoute);
router.use('/auth', authRoute);

module.exports = router;
