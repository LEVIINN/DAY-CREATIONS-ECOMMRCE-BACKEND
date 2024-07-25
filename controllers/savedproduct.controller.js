const catchAsync = require('../utils/catchAsync');
const SavedProduct = require('../models/savedProductModel');
const AppError = require('../utils/appError');
const { ApiResponse } = require('../helpers/responseHelper');

exports.getUserSavedProduct = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const savedproduct = await SavedProduct.find({ user: userId })
        .populate('product')
        .sort({ createdAt: -1 });
    return ApiResponse(
        200,
        res,
        'Saved Product fetched successully',
        'success',
        savedproduct
    );
});

exports.addToSavedProduct = catchAsync(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user.id;

    const existingProduct = await SavedProduct.findOne({
        user: userId,
        product: productId,
    });

    if (existingProduct) {
        return next(new AppError('Product already saved by you', 400));
    }

    const savedproduct = await SavedProduct.create({
        user: userId,
        product: productId,
    });

    return ApiResponse(
        201,
        res,
        'Product added to wishlist',
        'success',
        savedproduct
    );
});

exports.removeFromSavedProduct = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user.id;

    const existingProduct = await SavedProduct.findOneAndDelete({
        user: userId,
        product: productId,
    });

    if (!existingProduct) {
        return next(new AppError('Product not found', 404));
    }

    return ApiResponse(
        204,
        res,
        'Product removed from Saved Product',
        'success',
        null
    );
});
