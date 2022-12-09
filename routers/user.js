const express = require('express');
const { getUsers } = require('../controllers/users');
const userRouter = express.Router();
userRouter.get('/', getUsers);

module.exports = userRouter;
