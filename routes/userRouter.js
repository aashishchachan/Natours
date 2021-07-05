const express = require('express');
const userController = require('./../controller/usersController');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUserById)
    .patch(userController.updateUserById)
    .delete(userController.deleteUserById);

module.exports = router

