const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: 6,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is required'],
        min: 6,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password must be the same with Confirm Password',
        },
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

module.exports = mongoose.model('User', userSchema);
