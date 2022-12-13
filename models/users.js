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
      return result.rows[0];
    });
};
