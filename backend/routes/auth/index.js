const express = require('express'),
    router = express.Router(),
    { signUp } = require('../../controllers/auth'),
    { runValidation } = require('../../validator'),
    { validateSignUp } = require('../../validator/auth');

router.post('/', validateSignUp, runValidation, signUp);

module.exports = router;