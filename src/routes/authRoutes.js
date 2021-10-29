const express = require('express');
const controller = require('../controller/auth');

const router = express.Router();

router.post('/create', controller.create);
router.post('/login', controller.login);
router.post('/forgot', controller.forgotPassword);

module.exports = router;