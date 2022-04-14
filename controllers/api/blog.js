const { Blog, User } = require('../../models');

function get(req, res) {
  Blog
    .findAll({
      user_id: req.auth.id,
      include: [{
        model: User,
        as: 'user'
      }],
    })
    .then((blog) => {
      res.send(blog);
    });
}

function post(req, res) {
  const { id } = req.auth;
  Blog.create({
    ...req.body,
    user_id: id
  }).then(() => {
    res.sendStatus(200);
  });
}

module.exports = {
  get,
  post
};
