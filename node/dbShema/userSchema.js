const mongoose = require('mongoose');
const collection = require('../collections/collections.js');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//user singUp scheema

const User_Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  time: String,
  timeStamp: Date,
  profileImage: String,
  connections: [
    {
      connctionId: ObjectId,
      time: String,
      timeStamp: Date,
    },
  ],
  followers: [
    {
      followerId: ObjectId,
      time: String,
      timeStamp: Date,
    },
  ],
  notifications: [
    {
      userId: ObjectId,
      condentId: ObjectId,
      message: String,
      time: String,
      timeStamp: Date,
    },
  ],
});
const user_data = mongoose.model(collection.USER_COLLECTION, User_Schema);

//user sign in scheema

const UserSignIn_Schema = new mongoose.Schema({
  email: String,
  password: String,
});
const userSignIn_data = mongoose.model(collection.USER_COLLECTION, User_Schema);

// post

const Post_Schema = new mongoose.Schema({
  userId: String,
  postCaption: String,
  imageName: String,
  time: String,
  timeStamp: Date,
  report: Boolean,
  userProfileImage: String,
  userId: { type: ObjectId, ref: 'users' },
  reportPost: [
    {
      userId: String,
      comment: String,
      reportComment: String,
    },
  ],
  comments: [
    {
      commentedUserId: String,
      comment: String,
      time: String,
      timeStamp: Date,
      commentedUserImage: String,
      commentedUserName: String,
    },
  ],
  likes: [{ type: ObjectId }],
});
const Post_data = mongoose.model(collection.POST_COLLECTION, Post_Schema);

//chat

const Chat_Schema = new mongoose.Schema(
  {
    userId: String,
    connctionId: ObjectId,
    chat: [
      {
        messagerId: ObjectId,
        message: String,
      },
    ],
  },
  { timestamp: true }
);
const Caht_data = mongoose.model(collection.CHAT_COLLECTION, Chat_Schema);

module.exports = { user_data, userSignIn_data, Post_data, Caht_data };
