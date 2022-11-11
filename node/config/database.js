require('dotenv').config();

module.exports = {
  database: process.env.MONGODB_CONNECTION,
};
