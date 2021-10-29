const express = require('express');

const router = express.Router();

router.use('/course', require('./courseRoutes'));
router.use('/user', require('./authRoutes'));

module.exports = router;