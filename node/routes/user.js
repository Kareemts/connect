var express = require('express');
var router = express.Router();

const {
  signUp,
  resendOtp,
  signIN,
  getUserData,
  uploadPost,
  deletePost,
  getPostes,
  suggestions,
  otpVarification,
  connect,
  removeConnection,
  likePost,
  unlikePost,
  addComment,
  getPostComments,
  profile,
  addProfilePic,
  notifications,
  getConnections,
  getFollowers,
  connectedProfile,
  getChatingUser,
  sendMessage,
  getConversationUserData,
  getMessages,
  editProfile,
  serchUser,
  reprtPost,
  reprtUser,
  getNotification,
  notificationStatus,
  messageStatus,
  newMessageStatus,
} = require('../controller/user/userController');
const { verifyToken } = require('../middleware/middleware');

/* router for signUp */

router.post('/signUp', signUp);

/* router for resendOtp */

router.post('/resendOtp', resendOtp);

/**router for otp varification */

router.post('/otpVarification', otpVarification);

/* router for  signIn */

router.post('/signIn', signIN);

/* router for  getting userDatas */

router.get('/getUserData', verifyToken, getUserData);

/* router for  postImage */

router.post('/uploadPost', verifyToken, uploadPost);

/* router for  deleting post */

router.delete('/deletePost', verifyToken, deletePost);

/* router for  getPost */

router.get('/getPostes', verifyToken, getPostes);

/* router for getting suggestions in home page */

router.get('/suggestions', verifyToken, suggestions);

/**router for connect people */

router.post('/connect', verifyToken, connect);

/**router for remove connected people */

router.post('/removeConnection', verifyToken, removeConnection);

/**router for connect people */

router.put('/likePost', verifyToken, likePost);

/**router for connect people */

router.put('/unlikePost', verifyToken, unlikePost);

/**router for adding comment */

router.put('/addComment', verifyToken, addComment);

/**router for getting comments of post */

router.get('/getPostComments', verifyToken, getPostComments);

/**router for  profile */

router.get('/profile', verifyToken, profile);

/**router for  editing profile */

router.put('/editProfile', verifyToken, editProfile);

/**router for adding profilePic */

router.post('/addProfilePic', verifyToken, addProfilePic);

/**router for getting notifications */

router.get('/notifications', verifyToken, notifications);

/**router for geting connections */

router.get('/getConnections', verifyToken, getConnections);

/**router for geting followers */

router.get('/getFollowers', verifyToken, getFollowers);

/**router for geting connectedProfile */

router.get('/connectedProfile', verifyToken, connectedProfile);

/**router for geting chating user */

router.get('/getChatingUser', verifyToken, getChatingUser);

/**router for geting conversatin users details */

router.get('/getConversationUserData', verifyToken, getConversationUserData);

/**router for geting sending message */

router.post('/sendMessage', verifyToken, sendMessage);

/**router for geting all messages from the chat */

router.get('/getMessages', verifyToken, getMessages);

/**router for searching users */

router.get('/serchUser', verifyToken, serchUser);

/**router for reporting post */

router.post('/reprtPost', verifyToken, reprtPost);

/**router for reporting user */

router.post('/reprtUser', verifyToken, reprtUser);

/**router for getting  notification status */

router.get('/getNotification', verifyToken, getNotification);

/**router for change notificatin status */

router.get('/notificationStatus', verifyToken, notificationStatus);

/**router for change messageNotificationStatus status */

router.get('/messageStatus', verifyToken, messageStatus);

/**router for change messageNotificationStatus status */

router.get('/newMessageStatus', verifyToken, newMessageStatus);

module.exports = router;
