const express = require('express');
const { deleteCommentById } = require('../controllers/comment');

const commentsRouter = express.Router();

commentsRouter.delete('/:comment_id', deleteCommentById);

module.exports = commentsRouter;
