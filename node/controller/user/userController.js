const scheema = require('../../dbSheema/userScheema');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const authentication = require('../../authentication/jwt/jwtAuthentication');

/**
 *
 * @param {signUp data} req
 * @param {user exist or not} res
 */

const signUp = async (req, res) => {
  try {
    let userExi = await scheema.userSignUp_data.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    console.log();
    if (userExi) {
      console.log('User Exist');
      res.json({ userExi: true });
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      scheema.userSignUp_data(req.body).save();
      console.log('user added');
      res.json({ userAdded: true });
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *
 * @param {user email and password} req
 * @param {userLogin true or false} res
 */

const signIN = async (req, res) => {
  try {
    let user = await scheema.userSignIn_data.findOne({ email: req.body.email });
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
  console.log(data);
  console.log(data);
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
        scheema
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
    scheema.Post_data.find().then((result) => {
      result = result.reverse();
      res.json(result);
    });
  } catch (error) {
    res.json(error);
  }
};

const suggestions = (req, res) => {
  const userId = req.query.useId;
  console.log(userId);
  try {
    scheema.userSignIn_data
      .find({ _id: { $ne: userId } })
      .then((result) => {
        res.json(result);
        console.log(result);
      })
      .catch((err) => {});
  } catch (error) {}
};

module.exports = { signUp, signIN, imageUpload, getPostes, suggestions };
