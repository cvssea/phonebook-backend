require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;
const { CLUSTER } = process.env;

module.exports = {
  MONGODB_URI,
  CLUSTER,
  PORT,
};
