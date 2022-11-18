const schema = require('../../dbShema/userSchema');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const authentication = require('../../authentication/jwt/jwtAuthentication');
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
          console.log('', err.message);
        });
    }
  } catch (error) {
    console.log('', error.message);
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
      console.log(resp);
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
      console.log(err);
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
            jwt = await authentication.jwtAthentication(userData);
            res.json({ userLogin: true, userDetails: userData, token: jwt });
          } else {
            res.json({ userLogin: false }); //invalid password
          }
        })
        .catch((err) => {
          console.log('err', err.message);
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
        cb(null, Date.now() + '-' + data.useId + '.png');
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
    console.log(error);
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
    res.json(error.message);
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
  } catch (error) {}
};

const connect = async (req, res) => {
  console.log(req.body);
  const connectionData = {
    followerId: req.body.userId,
    time: req.body.date,
    timeStamp: req.body.timeStamp,
  };
  //adding connnection
  await schema.user_data.updateOne(
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
  //send notification
  connectionData.followerId = req.body.userId;
  connectionData.message = 'You have new follower';
  await schema.user_data.updateOne(
    {
      _id: req.body.connectedId,
    },
    {
      $push: { notifications: connectionData },
    }
  );
  res.status(200).json({ userConnecte: true });
};

const likePost = async (req, res) => {

  const likedData = {
    likedUserId: req.body.userId,
    timeStamp: req.body.timeStamp,
    time: req.body.date,
  };
  const liked = await schema.Post_data.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes:  req.body.userId },
    },
    {
      new: true,
    }
  );
  console.log(liked);
  res.status(200).json(liked);
};

const unlikePost = async (req, res) => {
  
  const likedData = {
    likedUserId: req.body.userId,
    timeStamp: req.body.timeStamp,
    time: req.body.date,
  };
  const liked = await schema.Post_data.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes:  req.body.userId },
    },
    {
      new: true,
    }
  );
  console.log(liked);
  res.status(200).json(liked);
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
};
