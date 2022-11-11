const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  // jwt authentication middleware

  verifyToken(req, res, next) {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
      res.json('invalid user');
    } else {
      let token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
          res.json('invalid user');
        } else {
          res.json(decoded);
          next();
        }
      });
    }
  },
};
