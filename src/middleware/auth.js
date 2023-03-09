//UNAUTHORIZATION !! UN REDIRECT
const auth = async (req, res, next) => {
    if (await req.session.user) {
      next();
    }
    else {
      res.redirect('/api/unauthorized');
    }
  };
  
  module.exports = auth;