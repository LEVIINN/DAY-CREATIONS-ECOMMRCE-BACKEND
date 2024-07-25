const express = require('express');
const {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProducts,getProductsByCategory,searchProducts
} = require('../controllers/product.controller');
const { userProtect } = require('../middleware/authMiddleware');
const {
    addToSavedProduct,
    getUserSavedProduct,
    removeFromSavedProduct,
} = require('../controllers/savedproduct.controller');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/new', createProduct);
router.get('/:productId', getProductById);
router.patch('/update/:productId', updateProduct);
router.delete('/delete/:productId', deleteProduct);
router.get('/category/:category',getProductsByCategory);
router.get( '/search',searchProducts);
router.post('/save', userProtect, addToSavedProduct);
router.get('/save/get', userProtect, getUserSavedProduct);
router.delete('/save/remove/:productId', userProtect, removeFromSavedProduct);

module.exports = router;
