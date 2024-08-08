const express = require('express');
const { userProtect } = require('../middleware/authMiddleware');
const {
    createOrder,
    getOrders,
    getUserOrders,
    getOrderByCustomId,
    updateOrder,
} = require('../controllers/order.controller');

const router = express.Router();

router.post('/create', userProtect, createOrder);
router.get('/', getOrders);
router.get('/user', userProtect, getUserOrders);
router.get('/:customId', getOrderByCustomId);
router.patch('/update/:id', updateOrder);
module.exports = router;
