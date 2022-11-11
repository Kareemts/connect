const mongoose = require('mongoose');
const collection = require('../collections/collections.js');

//user singUp scheema

const UserSignUp_Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  password: String,
  time: String,
  timeStamp: Date,
});
const userSignUp_data = mongoose.model(
  collection.USER_COLLECTION,
  UserSignUp_Schema
);

//user sign in scheema

const UserSignIn_Schema = new mongoose.Schema({
  email: String,
  password: String,
});
const userSignIn_data = mongoose.model(
  collection.USER_COLLECTION,
  UserSignUp_Schema
);

const Post_Schema = new mongoose.Schema({
  userId: String,
  postCaption: String,
  imageName: String,
  time: String,
  timeStamp: Date,
  report: Boolean,
  reportComment: [
    {
      reportComment: String,
    },
  ],
  comment: [
    {
      CommentedUserId: String,
      comment: String,
      time: String,
      timeStamp: Date,
    },
  ],
  like: [
    {
      likedUserId: String,
      time: Date,
    },
  ],
});
const Post_data = mongoose.model(collection.POST_COLLECTION, Post_Schema);

module.exports = { userSignUp_data, userSignIn_data, Post_data };
