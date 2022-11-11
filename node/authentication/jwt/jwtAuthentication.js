const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  /**
   *
   * @param {userDetails} data
   * @returns jwt token
   */
  jwtAthentication: (data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      try {
        token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
          expiresIn: 86400,
        });
        resolve(token);
        console.log('aaaa');
      } catch (error) {
        reject(error);
      }
    });
  },
};
