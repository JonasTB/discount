const express = require('express');
const controller = require('../controller/courses');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.post('/create', controller.create);
router.get('/many', controller.getMany);
router.get('/one/:id', controller.getOne);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;