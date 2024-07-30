const express = require('express');
const { userProtect } = require('../middleware/authMiddleware');
const { createReview, getProductReviews } = require('../controllers/reviews');

const router = express.Router();
router.post('/create', userProtect, createReview);
router.get('/get/:productId', getProductReviews);

module.exports = router;
