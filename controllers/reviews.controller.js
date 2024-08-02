const { ApiResponse } = require('../helpers/responseHelper');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviews');
const Product = require('../models/product');
const AppError = require('../utils/appError');

exports.createReview = catchAsync(async (req, res, next) => {
    const { productId, rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    const review = await Review.create({
        user: req.user.id,
        product: productId,
        rating,
        comment,
    });

    return ApiResponse(
        201,
        res,
        'Review created successfully',
        'success',
        review
    );
});

exports.getProductReviews = catchAsync(async (req, res, next) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    const reviews = await Review.find({ product: productId }).populate('user');

    return ApiResponse(
        200,
        res,
        'Reviews retrieved successfully',
        'success',
        reviews
    );
});
