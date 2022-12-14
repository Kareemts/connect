const mongoose = require('mongoose');
const collection = require('../collections/collections.js');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin_Schema = new mongoose.Schema({
  userName: String,
  password: String,
});
const admin_data = mongoose.model(collection.ADMIN_COLLECTION, Admin_Schema);

module.exports = { admin_data };
