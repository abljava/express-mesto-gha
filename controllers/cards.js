const httpConstants = require('http2').constants;
const { ObjectId } = require('mongoose').Types;
const Card = require('../models/card');

// функция валидации переданного id
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        res
          .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
        return;
      }
      res.status(httpConstants.HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      res
        .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .send({ message: err.message });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.status(httpConstants.HTTP_STATUS_OK).send(cards);
    })
    .catch(() => {
      res
        .status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCardById = (req, res) => {
  if (isValidObjectId(req.params.cardId)) {
    Card.findByIdAndRemove(req.params.cardId).then((card) => {
      if (!card) {
        res
          .status(httpConstants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
        return;
      }
      res
        .status(httpConstants.HTTP_STATUS_OK)
        .send({ message: 'Карточка удалена' });
    });
  } else {
    res
      .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Передан некорректный id карточки' });
  }
};

module.exports.likeCard = (req, res) => {
  if (isValidObjectId(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res
            .status(httpConstants.HTTP_STATUS_NOT_FOUND)
            .send({ message: 'Карточка не найдена' });
          return;
        }
        res.status(httpConstants.HTTP_STATUS_OK).send(card);
      });
  } else {
    res
      .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Передан некорректный id карточки' });
  }
};

module.exports.dislikeCard = (req, res) => {
  if (isValidObjectId(req.params.cardId)) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res
            .status(httpConstants.HTTP_STATUS_NOT_FOUND)
            .send({ message: 'Карточка не найдена' });
          return;
        }
        res.status(httpConstants.HTTP_STATUS_OK).send(card);
      });
  } else {
    res
      .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
      .send({ message: 'Передан некорректный id карточки' });
  }
};
