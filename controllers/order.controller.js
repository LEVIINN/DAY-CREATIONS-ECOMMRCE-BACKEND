const { ApiResponse } = require('../helpers/responseHelper');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
    const {
        products,
        totalPrice,
        status,
        paymentMethod,
        billingDetails,
        shippingAddress,
    } = req.body;

    const newOrder = await Order.create({
        user: req.user.id,
        products,
        totalPrice,
        paymentMethod,
        billingDetails,
        status,
        shippingAddress,
        customId: Date.now().toString().slice(9, 13),
    });
    if (!newOrder) next(new AppError('Failed to create order', 500));

    return ApiResponse(
        201,
        res,
        'Order created Successfully',
        'success',
        newOrder
    );
});

exports.getOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find()
        .populate('user')
        .populate({
            path: 'products.product',
            model: 'Product',
        })
        .sort({ createdAt: -1 });
    if (!orders) {
        return next(new AppError('no order found', 404));
    }
    return ApiResponse(
        201,
        res,
        'Order fetched Successfully',
        'success',
        orders
    );
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
        .populate('products.product')
        .sort({ createdAt: -1 });

    if (!orders) {
        return next(new AppError('There is no order associated with you', 404));
    }
    return ApiResponse(
        201,
        res,
        'Orders fetched Successfully',
        'success',
        orders
    );
});

exports.getOrderByCustomId = catchAsync(async (req, res, next) => {
    const { customId } = req.params;
    const order = await Order.find({ customId }).populate('products.product');

    if (!order) {
        return next(
            new AppError('There is no order associated with this ID', 404)
        );
    }
    return ApiResponse(
        201,
        res,
        'Order fetched Successfully',
        'success',
        order
    );
});

exports.updateOrder = catchAsync(async (req, res, next) => {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status,

            updatedAt: Date.now(),
        },
        { new: true, runValidators: true }
    );

    if (!order) return next(new AppError('Order not found', 404));

    return ApiResponse(
        201,
        res,
        'Order updated Successfully',
        'success',
        order
    );
});
