var express = require('express');
var router = express.Router();
const {
  signUp,
  signIN,
  imageUpload,
  getPostes,
  suggestions,
} = require('../controller/user/userController');
const middleware = require('../middleware/middleware');

/* router for signUp */

router.post('/signUp', signUp);

/* router for  signIn */

router.post('/signIn', signIN);

/* router for  postImage */

router.post('/uploadPost', imageUpload);

/* router for  getPost */

router.get('/getPostes', getPostes);

/* router for getting suggestions in home page */

router.get('/suggestions', suggestions)

module.exports = router;
