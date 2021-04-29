const db = require("../db/connection");

exports.isMalformedBody = (key, body) => {
  const bodyKeys = Object.keys(body);
  if (typeof key !== "number" || bodyKeys.length > 1) {
    return Promise.reject({
      status: 400,
      msg: `Bad request: malformed body`,
    });
  }
};

// exports.checkColumnExists = async (sort_by) => {
//   const result = await db.query(`SELECT $1 FROM article;`, [sort_by]);
//   console.log(result);
//   if (result.rowCount === 0) {
//     return false;
//   }
//   return true;
// };
