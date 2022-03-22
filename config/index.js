const secretKey = process.env.SECRET_KEY || 'secretKey';
const secretRefreshKey = process.env.SECRET_REFRESH_KEY || 'secretRefreshKey';
const jwt = require('jsonwebtoken');

module.exports = {
  jwt,
  secretKey,
  secretRefreshKey
};
