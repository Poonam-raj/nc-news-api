const express = require('express');
const { getTopics } = require('../controllers/api');

const topicsRouter = express.Router();
topicsRouter.get('/', getTopics);

module.exports = topicsRouter;
