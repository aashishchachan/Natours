const express = require('express');
const userRouter = require('./../controller/usersController')

const router = express.Router();

router.route('/')
    .get(userRouter.getAllUsers)
    .post(userRouter.createUser);

router.route('/:id')
    .get(userRouter.getUserById)
    .patch(userRouter.updateUserById)
    .delete(userRouter.deleteUserById);

module.exports = router

