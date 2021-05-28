const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const userController = require('./../controller/usersController')

const router = express.Router();

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

