const express = require('express'),
    router = express.Router(),
    { blog } = require('../../controllers/blog');

router.get('/', blog);

module.exports = router;