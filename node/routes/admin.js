var express = require('express');
const {
  adminSignIn,
  getReportedPosts,
  getUserData,
  getReportedUsers,
  blockPost,
  unblockPost,
  unblockUser,
  blockUser,
  dashboardData,
} = require('../controller/admin/adminContriller');

var router = express.Router();

/* GET admin login page. */
router.post('/adminSignIn', adminSignIn);

/* GET reported posts */
router.get('/getReportedPosts', getReportedPosts);

/* GET reported users */
router.get('/getReportedUsers', getReportedUsers);

/* GET user details . */
router.get('/getUserData', getUserData);

/* GET for blocking post  . */
router.put('/blockPost', blockPost);

/* GET for unblocking post  . */
router.put('/unblockPost', unblockPost);

/* GET for blocking post  . */
router.put('/blockUser', blockUser);

/* GET for unblocking post  . */
router.put('/unblockUser', unblockUser);

/* GET for dashboard datas  . */
router.get('/dashboardData', dashboardData);

module.exports = router;
