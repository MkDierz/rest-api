const { secretKey, jwt } = require('../config');

function checkToken(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    const bearer = authorization.split(' ');
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, secretKey, (err, authData) => {
      if (err) {
        return res.status(403).send();
      }
      req.auth = authData;
      return next();
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = { checkToken };
