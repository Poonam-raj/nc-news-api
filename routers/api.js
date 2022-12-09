const express = require('express');
const { getEndpoints } = require('../controllers/api');

const {
  topicsRouter,
  userRouter,
  articleRouter,
  commentsRouter,
} = require('../routers');

const apiRouter = express.Router();

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.get('/', getEndpoints);

module.exports = apiRouter;
