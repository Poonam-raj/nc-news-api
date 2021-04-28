const express = require('express');
const {getTopics} = require('../controllers/api.controller');

const apiRouter = express.Router();

apiRouter.get('/topics', getTopics);

module.exports = apiRouter;