const { User } = require('../models');
const { secretKey, secretRefreshKey, jwt } = require('../config');

const register = (req, res) => {
  const { userName, email, password } = req.body;
  User
    .findOne({
      where: { email },
    })
    .then((data) => {
      if (data) {
        return res.status(400).send({
          message: 'email exist',
        });
      }
      return User
        .create({
          userName,
          email,
          password,
        })
        .then(() => res.status(200).send({
          message: 'user registered',
          email,
          userName,
        }))
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
};

const login = (req, res) => {
  const { email, password } = req.body;

  User
    .findOne({
      where: { email },
      attributes: ['id', 'userName', 'email', 'password'],
    })
    .then((userData) => {
      if (!userData) {
        return res.status(400).send({
          message: 'email not found',
        });
      }
      return userData
        .validPassword(password, userData.password)
        .then((isAuth) => {
          if (!isAuth) {
            return res.send({
              message: 'unauthorized',
            });
          }
          const {
            id,
            userName,
          } = userData;

          const tokenData = {
            id,
            userName,
            email,
          };

          const token = jwt.sign(tokenData, secretKey, { expiresIn: '1d' });
          const refreshToken = jwt.sign(tokenData, secretRefreshKey, { expiresIn: '7d' });

          return res.send({
            message: 'authorized',
            token,
            refreshToken,
          });
        })
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
};

const refreshUserToken = (req, res) => {
  const { refreshToken } = req.body;

  jwt.verify(refreshToken, secretRefreshKey, (err, authData) => {
    if (err) {
      return res.status(403).send();
    }
    const data = authData;
    delete data.exp;
    delete data.iat;

    return res.send({
      message: 'token refreshed',
      token: jwt.sign(data, secretKey, { expiresIn: '1d' }),
      refreshToken: jwt.sign(data, secretKey, { expiresIn: '7d' }),
    });
  });
};

module.exports = {
  register,
  login,
  refreshToken: refreshUserToken,
};
