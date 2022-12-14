const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    let token = authHeader.split(' ')[1];
    if (token == null) return res.json({ userLogin: false });
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        res.json({ userLogin: false });
      } else {
        next();
      }
    });
  },
};
