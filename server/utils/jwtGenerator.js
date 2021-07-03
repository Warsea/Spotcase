const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id) {
  const secret = process.env.jwtSecret;
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });
}

module.exports = jwtGenerator;
