const express = require('express');

const router = express.Router();

const userApiController = require('../controllers/userController');

router.post('/login', userApiController.login);
router.post('/register', userApiController.register);
router.get('/', userApiController.getAll);
router.get('/:id', userApiController.getById)

module.exports = router;