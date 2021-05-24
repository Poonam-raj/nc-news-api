const express = require('express');
const {
  handleCustomErrors,
  handleSQLErrors,
  handleInternalServerError
} = require('./controllers/errors');
const cors = require('cors');
const apiRouter = require('./routers/api');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route Not Found' });
});
app.use(handleCustomErrors);
app.use(handleSQLErrors);
app.use(handleInternalServerError);

module.exports = app;
