const express = require('express');
const productRoute=require('./product.router')

const router = express.Router();

router.use('/product', productRoute);

module.exports = router;
