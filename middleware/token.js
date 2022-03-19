function checkToken(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    const bearer = authorization.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = { checkToken };
