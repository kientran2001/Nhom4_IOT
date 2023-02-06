const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { auth } = require('../../middleware');

router.get('/:id', auth, userController.getDetailUser);
router.post('/', userController.createUser);
router.patch('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);
router.get('/', auth, userController.getAllUsers);
router.get('/homes-of-user/:id', auth, userController.getHomesOfUser);

module.exports = router;