const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/auth.controller');
const { userProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-user-details', userProtect,getUserDetails)

module.exports = router;
