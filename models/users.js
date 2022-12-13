const db = require('../db/connection');

exports.selectUsers = () => {
  return db.query('SELECT * FROM users;').then((response) => {
    return response.rows;
  });
};

exports.selectUserByUsername = (username) => {
  return db
    .query('SELECT * FROM users WHERE username=$1', [username])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({ status: 404, msg: 'invalid username' });
      }
      return result.rows[0];
    });
};
