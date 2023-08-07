const httpConstants = require('http2').constants;
const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');

// функция валидации переданного id
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
        return;
      }
      res.status(httpConstants.HTTP_STATUS_CREATED).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: err.message });
      } else {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res
        .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUserById = (req, res) => {
  if (isValidObjectId(req.params.userId)) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          res
            .status(httpConstants.HTTP_STATUS_NOT_FOUND)
            .send({ message: 'Пользователь не найден' });
          return;
        }
        res.send(user);
      })
      .catch(() => {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      });
  } else {
    res
      .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Передан некорректный id пользователя' });
  }
};

module.exports.editUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: 'true', runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(httpConstants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: err.message });
      } else {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.editAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: 'true', runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(httpConstants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: err.message });
      } else {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
