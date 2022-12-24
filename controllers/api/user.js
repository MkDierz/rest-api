const { User } = require('../../models');

const userData = (req, res) => {
  const { id } = req.auth;

  User
    .findOne({
      where: { id },
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.status(500).send(err));
};

const updateProfile = (req, res) => {
  const { id } = req.auth;
  const { userName, email } = req.body;
  User
    .update({
      userName,
      email,
    }, {
      where: { id },
    })
    .then(() => res.send({ message: 'profile updated' }))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  userData,
  updateProfile,
};
