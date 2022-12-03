const schema = require('../../dbShema/userSchema');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const authentication = require('../../authentication/jwt/jwtAuthentication');
const objectId = require('mongodb').ObjectId;
const client = require('twilio')(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN,
  {
    lazyLoading: true,
  }
);

/**
 *
 * @param {signUp data} req
 * @param {user exist or not} res
 */

const signUp = async (req, res) => {
  try {
    let userExi = await schema.user_data.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    if (userExi) {
      console.log('User Exist');
      res.json({ userExi: true });
    } else {
      const mobile = req.body.phone;

      //twilio.....................................
      client.verify
        .services(process.env.SERVICE_SID)
        .verifications.create({
          to: `+91${mobile}`,
          channel: 'sms',
        })
        .then((result) => {
          res.json({ OtpVerify: true, data: req.body });
        })
        .catch((err) => {
          res.status(500).json({ error: true });
        });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const otpVarification = (req, res) => {
  const mobile = '+91' + req.body.props.data.phone;
  const otp = req.body.otp;
  client.verify
    .services(process.env.SERVICE_SID)
    .verificationChecks.create({
      to: mobile,
      code: otp,
    })
    .then(async (resp) => {
      if (resp.valid) {
        console.log('valid');
        const data = req.body.props.data;
        console.log('succes');
        data.password = await bcrypt.hash(data.password, 10);
        schema.user_data(data).save();
        console.log('user added');
        res.json({ userAdded: true });
      } else {
        res.json({ otpValid: false }); // invalid
        console.log('invalid');
      }
    })
    .catch((err) => {
      res.status(500).json({ error: true });
    });
};

/**
 *
 * @param {user email and password} req
 * @param {userLogin true or false} res
 */

const signIN = async (req, res) => {
  try {
    let user = await schema.userSignIn_data.findOne({ email: req.body.email });
    if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then(async (result) => {
          if (result) {
            let userData = {};
            userData.name = user.firstName + ' ' + user.lastName;
            userData.id = user._id;
            userData.email = user.email;
            userData.phone = user.phone;
            userData.profileImage = user.profileImage;
            jwt = await authentication.jwtAthentication(userData);
            res.json({ userLogin: true, userDetails: userData, token: jwt });
          } else {
            res.json({ userLogin: false }); //invalid password
          }
        })
        .catch((err) => {
          res.status(500).json({ error: true });
        });
    } else {
      res.json({ userLogin: false }); // invalid  userName or password
    }
  } catch (error) {
    console.log(error.message);
    res.json({ err: true }); //invalid password
  }
};

/**
 *
 * @param {post caption and post image} req
 * @param {success or fail message} res
 */

const imageUpload = (req, res) => {
  const data = req.query;
  try {
    const storage = multer.diskStorage({
      destination: path.join(__dirname, '../../public/images', 'potImages'),
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + data.userId + '.png');
      },
    });

    const upload = multer({ storage: storage }).single('file');

    upload(req, res, (err) => {
      if (!req.file) {
        console.log('no image');
        res.json({ noImage: 'select image' });
      } else {
        data.imageName = req.file.filename;
        schema
          .Post_data(data)
          .save()
          .then((result) => {
            res.json({ posted: result });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

/**
 *
 * @param {*} req
 * @param {post collectin data data } res
 */

const getPostes = (req, res) => {
  try {
    schema.Post_data.find()
      .populate({ path: 'userId' })
      .then((result) => {
        result = result.reverse();
        res.json(result);
      });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const suggestions = (req, res) => {
  const userId = req.query.useId;

  try {
    schema.userSignIn_data
      .find({ _id: { $ne: userId } })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {});
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const connect = async (req, res) => {
  console.log(req.body);

  try {
    const connectionData = {
      followerId: req.body.userId,
      time: req.body.date,
      timeStamp: req.body.timeStamp,
    };

    const data = await schema.user_data.updateOne(
      {
        _id: req.body.connectedId,
      },
      {
        $push: { followers: connectionData },
      }
    );

    connectionData.connctionId = req.body.connectedId;

    await schema.user_data.updateOne(
      {
        _id: req.body.userId,
      },
      {
        $push: { connections: connectionData },
      }
    );

    connectionData.userId = req.body.userId;
    connectionData.message = 'You have new follower';
    await schema.user_data.updateOne(
      {
        _id: req.body.connectedId,
      },
      {
        $push: { notifications: connectionData },
      }
    );
    res.status(200).json('userConnected');
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const removeConnection = async (req, res) => {
  // for remove data from user followers list

  try {
    const connectionData = {
      followerId: req.body.userId,
    };

    await schema.user_data.updateOne(
      {
        _id: req.body.connectedId,
      },
      {
        $pull: { followers: connectionData },
      }
    );

    // for remove data from user connections list

    const data = await schema.user_data.updateOne(
      {
        _id: req.body.userId,
      },
      {
        $pull: { connections: { connctionId: req.body.connectedId } },
      }
    );

    // for remove data from user notification list

    await schema.user_data.updateOne(
      {
        _id: req.body.connectedId,
      },
      {
        $pull: { notifications: { userId: req.body.userId } },
      }
    );
    res.status(200).json('userConnecttionRemove');
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const likePost = async (req, res) => {
  try {
    const likedData = {
      likedUserId: req.body.userId,
      timeStamp: req.body.timeStamp,
      time: req.body.date,
    };
    const liked = await schema.Post_data.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.body.userId },
      },
      {
        new: true,
      }
    );
    likedData.message = 'Liked your post';
    likedData.userId = req.body.userId;
    likedData.condentId = req.body.postId;
    await schema.user_data.updateOne(
      {
        _id: req.body.postedUserId,
      },
      {
        $push: { notifications: likedData },
      }
    );

    res.status(200).json(liked);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const unlikePost = async (req, res) => {
  try {
    const likedData = {
      likedUserId: req.body.userId,
      timeStamp: req.body.timeStamp,
      time: req.body.date,
    };
    const uliked = await schema.Post_data.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.body.userId },
      },
      {
        new: true,
      }
    );

    likedData.message = 'Liked your post';
    likedData.userId = req.body.userId;
    likedData.condentId = req.body.postId;

    await schema.user_data.updateOne(
      {
        _id: req.body.postedUserId,
      },
      {
        $pull: { notifications: { userId: req.body.userId } },
      }
    );
    res.status(200).json(uliked);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const addComment = async (req, res) => {
  try {
    const data = {
      CommentedUserId: req.body.userId,
      comment: req.body.comment,
      time: req.body.date,
      timeStamp: req.body.timeStamp,
      commentedUserImage: req.body.profileImage,
      commentedUserName: req.body.userName,
    };
    const comment = await schema.Post_data.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: data },
      },
      {
        new: true,
      }
    );

    const notification = {
      userId: req.body.userId,
      condentId: req.body.postId,
      message: 'Commented your post : ' + req.body.comment,
      timeStamp: req.body.timeStamp,
      time: req.body.date,
    };
    await schema.user_data.updateOne(
      {
        _id: req.body.postedUserId,
      },
      {
        $push: { notifications: notification },
      }
    );
    res.status(200).json({ commentAdded: true });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const profile = async (req, res) => {
  try {
    const userData = await schema.user_data.findById(req.query.userId);
    const post = await schema.Post_data.find({
      userId: req.query.userId,
    });
    res.status(200).json({ userData, post });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const addProfilePic = (req, res) => {
  try {
    const data = req.query;
    const storage = multer.diskStorage({
      destination: path.join(__dirname, '../../public/images', 'profileImages'),
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + data.userId + '.png');
      },
    });

    const upload = multer({ storage: storage }).single('file');

    upload(req, res, (err) => {
      if (!req.file) {
        console.log('no image');
        res.json({ noImage: 'select image' });
      } else {
        const profileImage = req.file.filename;
        schema.user_data
          .findByIdAndUpdate(data.userId, {
            profileImage,
          })
          .then((result) => {
            res.status(200).json({ addProfileImage: result });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const notifications = async (req, res) => {
  try {
    const notifications_Likes = await schema.user_data.aggregate([
      {
        $match: { _id: objectId(req.query.userId) },
      },
      {
        $unwind: '$notifications',
      },
      {
        $project: {
          userId: '$notifications.userId',
          condentId: '$notifications.condentId',
          message: '$notifications.message',
          time: '$notifications.time',
          timeStamp: '$notifications.timeStamp',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userData',
        },
      },
      {
        $project: {
          userId: 1,
          condentId: 1,
          message: 1,
          time: 1,
          timeStamp: 1,
          userData: 1,
        },
      },
      {
        $unwind: '$userData',
      },
      {
        $project: {
          userId: 1,
          condentId: 1,
          message: 1,
          time: 1,
          timeStamp: 1,
          firstName: '$userData.firstName',
          lastName: '$userData.lastName',
          profileImage: '$userData.profileImage',
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'condentId',
          foreignField: '_id',
          as: 'postData',
        },
      },
      {
        $project: {
          userId: 1,
          condentId: 1,
          message: 1,
          time: 1,
          timeStamp: 1,
          firstName: 1,
          lastName: 1,
          profileImage: 1,
          postData: 1,
        },
      },
      {
        $unwind: '$postData',
      },
      {
        $project: {
          userId: 1,
          condentId: 1,
          message: 1,
          time: 1,
          timeStamp: 1,
          firstName: 1,
          lastName: 1,
          profileImage: 1,
          postCaption: '$postData.postCaption',
          imageName: '$postData.imageName',
        },
      },
    ]);

    const notifications_Followers = await schema.user_data.aggregate([
      {
        $match: { _id: objectId(req.query.userId) },
      },

      {
        $unwind: {
          path: '$notifications',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          userId: '$notifications.userId',
          condentId: '$notifications.condentId',
          message: '$notifications.message',
          time: '$notifications.time',
          timeStamp: '$notifications.timeStamp',
        },
      },
      { $match: { message: 'You have new follower' } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'followerData',
        },
      },
      {
        $unwind: {
          path: '$followerData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          userId: 1,
          condentId: 1,
          message: 1,
          time: 1,
          timeStamp: 1,
          firstName: '$followerData.firstName',
          lastName: '$followerData.lastName',
          profileImage: '$followerData.profileImage',
        },
      },
    ]);

    const noti = [...notifications_Followers, ...notifications_Likes];
    res.status(200).json(noti);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const getConnections = async (req, res) => {
  try {
    const connections = await schema.user_data.aggregate([
      {
        $match: { _id: objectId(req.query.userId) },
      },
      {
        $unwind: '$connections',
      },
      {
        $project: {
          connctionId: '$connections.connctionId',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'connctionId',
          foreignField: '_id',
          as: 'connectionData',
        },
      },
      {
        $unwind: '$connectionData',
      },
      {
        $project: {
          connctionId: 1,
          firstName: '$connectionData.firstName',
          lastName: '$connectionData.lastName',
          profileImage: '$connectionData.profileImage',
        },
      },
    ]);

    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const getFollowers = async (req, res) => {
  try {
    const followers = await schema.user_data.aggregate([
      {
        $match: { _id: objectId(req.query.userId) },
      },
      {
        $unwind: '$followers',
      },
      {
        $project: {
          connctionId: '$followers.followerId',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'connctionId',
          foreignField: '_id',
          as: 'followerData',
        },
      },
      {
        $unwind: '$followerData',
      },
      {
        $project: {
          connctionId: 1,
          firstName: '$followerData.firstName',
          lastName: '$followerData.lastName',
          profileImage: '$followerData.profileImage',
        },
      },
    ]);
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const connectedProfile = async (req, res) => {
  const connectionId = req.query.connectionId.connectionId;

  const connectedProfile = await schema.user_data.findOne({
    _id: connectionId,
  });

  const connectedUserPosts = await schema.Post_data.find({
    userId: connectionId,
  });
  res.status(200).json({ connectedProfile, connectedUserPosts });
};

const getChatingUser = async (req, res) => {
  let chatingData = null;
  let UserData = null;
  try {
    const connectionId = req.query.connectionId?.connectionId;
    if (req.query.connectionId != null) {
      const getChatingUser = await schema.user_data.findOne({
        _id: connectionId,
      });

      const getUser = await schema.user_data.findOne({
        _id: req.query.userId,
      });

      chatingData = {
        name: getChatingUser?.firstName + ' ' + getChatingUser?.lastName,
        profieImage: getChatingUser?.profileImage,
      };
      UserData = {
        name: getUser?.firstName + ' ' + getUser?.lastName,
        profieImage: getUser?.profileImage,
      };
    }

    const chats = await schema.Caht_data.find({
      chatingId: req.query.userId,
    });

    let data = {
      chatingData,
      chats,
      UserData,
    };
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true });
  }
};

const getConversationUserData = async (req, res) => {
  try {
    const user = req.query.chatingId;
    const getConversationUserData = await schema.user_data.findOne({
      _id: user,
    });

    chatingData = {
      name:
        getConversationUserData.firstName +
        ' ' +
        getConversationUserData.lastName,

      profileImage: getConversationUserData.profileImage,
    };

    res.status(200).json(chatingData);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const sendMessage = async (req, res) => {
  try {
    const userId = req.body.userId;

    const connectionId = req.body.connectionId.connectionId;

    const message = [
      {
        messagerId: req.body.userId,
        message: req.body.sentmessage,
        timestamp: req.body.timeStamp,
        time: req.body.date,
      },
    ];

    const chat = await schema.Caht_data.findOne({
      $and: [{ chatingId: userId }, { chatingId: connectionId }],
    });

    if (chat) {
      const chat = await schema.Caht_data.updateOne(
        {
          $and: [{ chatingId: userId }, { chatingId: connectionId }],
        },
        {
          $push: { chat: message },
        }
      );
      res.status(200).json(chat);
    } else {
      const data = {
        chatingId: [userId, connectionId],
        chat: message,
      };

      const chat = await schema.Caht_data(data).save();

      res.status(200).json(chat);
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

const getMessages = async (req, res) => {
  try {
    console.log(req.query);

    const userId = req.query.userId;

    const connectionId = req.query.connectionId?.connectionId;

    const messages = await schema.Caht_data.findOne({
      $and: [{ chatingId: userId }, { chatingId: connectionId }],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: true });
  }
};

module.exports = {
  signUp,
  signIN,
  imageUpload,
  getPostes,
  suggestions,
  otpVarification,
  connect,
  likePost,
  unlikePost,
  addComment,
  profile,
  addProfilePic,
  notifications,
  getConnections,
  getFollowers,
  connectedProfile,
  removeConnection,
  getChatingUser,
  sendMessage,
  getConversationUserData,
  getMessages,
};
