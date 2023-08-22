const { celebrate, Joi } = require('celebrate');

const validateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    })
    .unknown(true),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(
      new RegExp(
        '^(https?:\\/\\/)?'
          + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
          + '((\\d{1,3}\\.){3}\\d{1,3}))'
          + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
          + '(\\?[;&a-z\\d%_.~+=-]*)?'
          + '(\\#[-a-z\\d_]*)?$',
        'i',
      ),
    ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateEditUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateEditAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(
      new RegExp(
        '^(https?:\\/\\/)?'
          + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
          + '((\\d{1,3}\\.){3}\\d{1,3}))'
          + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
          + '(\\?[;&a-z\\d%_.~+=-]*)?'
          + '(\\#[-a-z\\d_]*)?$',
        'i',
      ),
    ),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(
      new RegExp(
        '^(https?:\\/\\/)?'
          + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
          + '((\\d{1,3}\\.){3}\\d{1,3}))'
          + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
          + '(\\?[;&a-z\\d%_.~+=-]*)?'
          + '(\\#[-a-z\\d_]*)?$',
        'i',
      ),
    ),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateEditUser,
  validateEditAvatar,
  validateUserId,
  validateCardId,
  validateCreateCard,
};
