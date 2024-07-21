const express = require('express');
const {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProducts,
} = require('../controllers/product.controller');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/new', createProduct);
router.get('/:productId', getProductById);
router.patch('/update/:productId', updateProduct);
router.delete('/delete/:productId', deleteProduct);

module.exports = router;
