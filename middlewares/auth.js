const jwt = require('jsonwebtoken');
const { NotAuthorized } = require('../errors/not-authorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthorized('Необходима авторизация 1'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET_KEY');
  } catch (err) {
    return next(new NotAuthorized('Необходима авторизация 2'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
