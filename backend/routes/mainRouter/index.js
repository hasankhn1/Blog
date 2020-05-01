const express = require('express'),
    router = express.Router();

router.use('/blogs', require('../blog'));
router.use('/auth', require('../auth'));

module.exports = router;