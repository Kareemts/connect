const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  /**
   *
   * @param {userDetails} data
   * @returns jwt token
   */
  jwtAthentication: (data) => {
    console.log('aaaaa',data.email);
    data = {
      id : data.id,
    }
    console.log('aaaaa',data);
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
          expiresIn: 86400,
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  },
};
