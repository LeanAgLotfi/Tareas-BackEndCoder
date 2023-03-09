const { SECRET_KEY } = require('../constants/constants')

const sessionMiddleware = async (req, res, next) => {
  const cookies = req.cookies
  if (Object.keys(cookies).includes(SECRET_KEY)) {
    res.redirect('/products');
  } else {
    next();
  }
};

module.exports = {
  sessionMiddleware
}

