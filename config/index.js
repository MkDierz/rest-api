const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || 'secretKey';
const secretRefreshKey = process.env.SECRET_REFRESH_KEY || 'secretRefreshKey';
const environment = process.env.NODE_ENV;

module.exports = {
  jwt,
  secretKey,
  secretRefreshKey,
  environment
};
