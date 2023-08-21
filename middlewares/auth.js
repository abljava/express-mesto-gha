const jwt = require('jsonwebtoken');
const { NotAuthorized } = require('../.github/errors/not-authorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorized('Необходима авторизация 1');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new NotAuthorized('Необходима авторизация 2'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
