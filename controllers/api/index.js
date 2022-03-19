const getUserData = (req, res) => {
  const { token } = req;
  res.send(token);
};

module.exports = {
  getUserData,
};
