const userData = (req, res) => {
  return res.status(200).send(req.auth)
};

module.exports = {
  userData
};
