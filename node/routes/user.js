var express = require('express');
var router = express.Router();
const {
  signUp,
  signIN,
  imageUpload,
  getPostes,
  suggestions,
  otpVarification,
  connect,
  removeConnection,
  likePost,
  unlikePost,
  addComment,
  profile,
  addProfilePic,
  notifications,
  getConnections,
  getFollowers,
  connectedProfile,
  
} = require('../controller/user/userController');
const { verifyToken } = require('../middleware/middleware');

/* router for signUp */

router.post('/signUp', signUp);

/* router for  signIn */

router.post('/signIn', signIN);

/* router for  postImage */

router.post('/uploadPost', imageUpload);

/* router for  getPost */

router.get('/getPostes', getPostes);

/* router for getting suggestions in home page */

router.get('/suggestions', suggestions);

/**router for otp varification */

router.post('/otpVarification', otpVarification);

/**router for connect people */

router.post('/connect', connect);

/**router for remove connected people */

router.post('/removeConnection', removeConnection);

/**router for connect people */

router.put('/likePost', likePost);

/**router for connect people */

router.put('/unlikePost', unlikePost);

/**router for adding comment */

router.put('/addComment', addComment);

/**router for  profile */

router.get('/profile', profile);

/**router for adding profilePic */

router.post('/addProfilePic', addProfilePic);

/**router for getting notifications */

router.get('/notifications', notifications);

/**router for geting connections */

router.get('/getConnections', getConnections);

/**router for geting followers */

router.get('/getFollowers', getFollowers);

/**router for geting connectedProfile */

router.get('/connectedProfile', connectedProfile);



module.exports = router;
