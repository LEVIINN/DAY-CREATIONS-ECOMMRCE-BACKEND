const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { createSendToken } = require('../utils/createToken');
const AppError = require('../utils/appError');
const { ApiResponse } = require('../helpers/responseHelper');

exports.registerUser = catchAsync(async (req, res, next) => {
    const { userName, password, email, confirmPassword } = req.body;
    if (!userName || !email || !password || !confirmPassword) {
        return next(new AppError('Please provide all your details', 400));
    }
    const newUser = await User.create({
        userName,
        email,
        password,
        confirmPassword,
    });
    createSendToken(newUser, 201, res, 'Account created successfully');
});

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    createSendToken(user, 201, res, 'Logged in successfully');
});

exports.getUserDetails = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new AppError('No user found', 404));
    }
    user.password = undefined;
    user.confirmPassword = undefined;
    return ApiResponse(201, res, 'User fetched successfully', 'success', user);
});
