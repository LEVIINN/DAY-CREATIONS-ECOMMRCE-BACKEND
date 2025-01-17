const { ApiResponse } = require('../helpers/responseHelper');
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/product');
const AppError = require('../utils/appError');

exports.createProduct = catchAsync(async (req, res, next) => {
    const {
        productName,
        description,
        category,
        NGNPrice,
        USDPrice,
        GBPPrice,
        inStock,
        images,
        size,
    } = req.body;

    const existingProduct = await Product.findOne({ productName });

    if (existingProduct) {
        return next(new AppError('Product already exists with this name', 400));
    }

    const newProduct = await Product.create({
        productName,
        description,
        category,
        NGNPrice,
        USDPrice,
        GBPPrice,
        inStock,
        images,
        size,
    });
    if (!newProduct) next(new AppError('Failed to create product', 500));

    return ApiResponse(
        201,
        res,
        'Product created Successfully',
        'success',
        newProduct
    );
});

exports.getProductById = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError('Could not find product details', 400));
    }

    return ApiResponse(
        201,
        res,
        'Product fetched Successfully',
        'success',
        product
    );
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find().sort({ createdAt: -1 });
    if (!products) {
        return next(new AppError('Could not find any product', 404));
    }
    return ApiResponse(
        201,
        res,
        'Products fetched Successfully',
        'success',
        products
    );
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const {
        productName,
        description,
        category,
        NGNPrice,
        USDPrice,
        GBPPrice,
        inStock,
        images,
        size,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            productName,
            description,
            category,
            NGNPrice,
            USDPrice,
            GBPPrice,
            inStock,
            images,
            size,
        },
        { new: true }
    );
    if (!updatedProduct) {
        return next(new AppError('Failed to update product', 500));
    }
    return ApiResponse(
        201,
        res,
        'Product updated Successfully',
        'success',
        updatedProduct
    );
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
        return next(
            new AppError('Could not find the product to be deleted', 404)
        );
    }
    return ApiResponse(
        201,
        res,
        'Product deleted Successfully',
        'success',
        null
    );
});

exports.getProductsByCategory = catchAsync(async (req, res, next) => {
    const { category } = req.params;
    const products = await Product.find({ category });
    if (!products.length) {
        return next(new AppError('No products found for this category', 404));
    }
    return ApiResponse(
        200,
        res,
        'Products fetched successfully',
        'success',
        products
    );
});

exports.searchProducts = catchAsync(async (req, res, next) => {
    const { query } = req.query;
    const products = await Product.find({
        $or: [
            { productName: new RegExp(query, 'i') },
            { category: new RegExp(query, 'i') },
        ],
    });
    if (!products.length) {
        return next(new AppError('No products found matching the query', 404));
    }
    return ApiResponse(
        200,
        res,
        'Products fetched successfully',
        'success',
        products
    );
});
