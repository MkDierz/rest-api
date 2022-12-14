const { Blog, User } = require('../../models');

function get(req, res) {
  Blog
    .findAndCountAll({

    })
    .then((data) => {
      res.json(data);
    });
}

function post(req, res) {
  const { id } = req.auth;
  Blog
    .create({
      user_id: id,
      ...req.body,
    })
    .then(() => res.sendStatus(201));
}

function getId(req, res) {
  const { id } = req.params;
  Blog
    .findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    })
    .then((data) => {
      res.json(data);
    });
}

function deleteId(req, res) {
  const { id } = req.params;

  return Blog
    .findByPk(id)
    .then((data) => {
      if (!data) {
        return res.sendStatus(404);
      }
      return data
        .destroy()
        .then(() => res.sendStatus(204));
    });
}

function putId(req, res) {
  const { id } = req.params;

  return Blog
    .findByPk(id)
    .then((data) => {
      if (!data) {
        return res.sendStatus(404);
      }
      return data
        .update({
          ...req.body,
        })
        .then(() => res.sendStatus(200));
    });
}

module.exports = {
  get,
  getId,
  post,
  putId,
  deleteId,
};
