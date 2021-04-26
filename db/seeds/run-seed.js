const seed = require("./seed");
const devData = require("../data/development-data/index.js");
const db = require("../connection");

const runSeed = async () => {
  await seed(devData);
  db.end();
};

runSeed();

module.exports = runSeed;
