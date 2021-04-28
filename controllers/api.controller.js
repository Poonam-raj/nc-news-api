const { selectTopics } = require('../models/api.model');

exports.getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  })
  .catch((err) => {
      console.log(err);
  })
};
