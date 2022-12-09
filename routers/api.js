const express = require('express');
const { getTopics, getEndpoints } = require('../controllers/api');

const articleRouter = require('./article');
const commentsRouter = require('./comments');
const userRouter = require('./user');

const apiRouter = express.Router();

apiRouter.get('/topics', getTopics);
apiRouter.use('/users', userRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.get('/', getEndpoints);

module.exports = apiRouter;
