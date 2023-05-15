const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req) => {
    const token = req.headers.authorization;
    if (!token || token === 'null') {
      return false;
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return false;
      }
      req.user = decode;
    });
    return true;
  };

    module.exports = verifyToken;