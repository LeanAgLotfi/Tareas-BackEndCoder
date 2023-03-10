const { SECRET_KEY } = require("../constants/constants");

const authMiddleware = async (req, res, next) => {
  const cookies = req.cookies
  if (Object.keys(cookies).includes(SECRET_KEY)) {
    next();
  } else {
    res.redirect('/api/view/');
  }
};

module.exports = {
  authMiddleware
}