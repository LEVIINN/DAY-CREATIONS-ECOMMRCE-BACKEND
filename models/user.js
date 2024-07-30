const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName: {
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
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = function (
    candidatePassword,
    userPassword
) {
    return bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
