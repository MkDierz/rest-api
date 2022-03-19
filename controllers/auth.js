const register = (req, res) => {
  const { userName, email } = req.body;

  return res.status(200).json({
    userName,
    email,
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return res.status(200).send({
    email,
    password
  });
};

module.exports = {
  register,
  login
};
