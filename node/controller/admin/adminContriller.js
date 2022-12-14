const adminSchema = require('../../dbShema/adminScheema');
const userSchema = require('../../dbShema/userSchema');
const bcrypt = require('bcrypt');
const authentication = require('../../authentication/jwt/jwtAuthentication');
const objectId = require('mongodb').ObjectId;

const adminSignIn = async (req, res) => {
  console.log(req.body);
  try {
    let user = await adminSchema.admin_data.findOne({
      userName: req.body.userName,
    });
    if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then(async (result) => {
          console.log(result);
          if (result) {
            let userData = {};
            userData.userName = user.userName;
            userData.password = user.password;
            jwt = await authentication.jwtAthentication(userData);
            console.log(jwt);
            res.json({ adminSignIn: true, token: jwt });
          } else {
            res.json({ adminSignIn: false }); //invalid password
          }
        })
        .catch((err) => {
          res.status(500).json({ error: true });
        });
    } else {
      res.json({ adminSignIn: false }); // invalid  userName or password
    }
  } catch (error) {
    console.log(error.message);
    res.json({ error: true });
  }
};

const getReportedPosts = async (req, res) => {
  try {
    const reportedPostes = await userSchema.Post_data.find({
      report: true,
    });
    res.status(200).json(reportedPostes);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const getReportedUsers = async (req, res) => {
  try {
    const reportedPostes = await userSchema.user_data.find({
      report: true,
    });
    res.status(200).json(reportedPostes);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const getUserData = async (req, res) => {
  try {
    userData = await userSchema.user_data.findOne({
      _id: req.query.userId,
    });
    userData = {
      name: userData?.firstName + ' ' + userData?.lastName,
      profileImage: userData.profileImage,
    };
    res.status(200).json(userData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true });
  }
};

const blockPost = async (req, res) => {
  try {
    const blocked = await userSchema.Post_data.findByIdAndUpdate(
      req.body.postId,
      {
        blockPost: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json(blocked.blockPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

const unblockPost = async (req, res) => {
  try {
    const unBlocked = await userSchema.Post_data.findByIdAndUpdate(
      req.body.postId,
      {
        blockPost: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json(unBlocked.blockPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

const blockUser = async (req, res) => {
  try {
    const blocked = await userSchema.user_data.findByIdAndUpdate(
      req.body.postId,
      {
        blockUser: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json(blocked.blockUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

const unblockUser = async (req, res) => {
  try {
    const unBlocked = await userSchema.user_data.findByIdAndUpdate(
      req.body.postId,
      {
        blockUser: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json(unBlocked.blockUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

const dashboardData = async (req, res) => {
  try {
    const post = await userSchema.Post_data.find();
    const user = await userSchema.user_data.find();
    res.status(200).json({ post: post.length, user: user.length });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

module.exports = {
  adminSignIn,
  getReportedPosts,
  getUserData,
  getReportedUsers,
  blockPost,
  unblockPost,
  blockUser,
  unblockUser,
  dashboardData,
};
