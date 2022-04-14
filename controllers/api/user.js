const { User } = require('../../models');

const userData = (req, res) => {
  const { id } = req.auth;

  User
    .findOne({
      id
    })
    .then((user) => {
      res.send(user);
    });
};

const updateProfile = (req, res) => {
  const { id } = req.auth;
  const { userName, email } = req.body;
  User.update({
    userName,
    email
  }, {
    where: { id },
  });
  res.status(200).send({ message: 'profile updated' });
};

module.exports = {
  userData,
  updateProfile
};
