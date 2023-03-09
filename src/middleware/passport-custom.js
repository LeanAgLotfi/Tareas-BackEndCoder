const passport = require('passport');
const passportJwt = require('passport-jwt');
const passportGithub = require("passport-github2");
const { HTTP_STATUS } = require('../constants/status.constants')
const { SECRET_KEY }= require("../constants/constants.js");
const { USER_ROLES } = require('../constants/user.constants')
const { cookieExtractor } = require ("./authToken.middleware.js");
const { UsersMongoDAO } = require ('../dao/Model/Mongo/user.mongo');

const GithubStrategy = passportGithub.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// JWT
passport.use(new JwtStrategy({
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
  }, async (jwt_payload, done) => {
    try {
      done(null, jwt_payload);
    }
    catch(error) {
      done(error);
    }
  }
));

// Github
passport.use(new GithubStrategy({
    clientID: 'Iv1.27cc1d5f10913cbd',
    clientSecret: '0985b86455f70a7b72731c5ccadabc4963f7f61e',
    callbackURL: 'http://localhost:8080/api/github/callback'
  },
  async (_aToken, _rToken, profile, done) => {
    const userData = profile._json;
    try {
      const user = await UsersMongoDAO.getByEmail(userData.email);
      if (!user) {
        const newUser = {
          name: userData.name.split(" ")[0],
          lastname: userData.name.split(" ")[1],
          age: userData.age || null,
          email: userData.email,
          password: null,
          role: USER_ROLES.USER,
          github_username: userData.login
        };
        const newUserResponse = await UsersMongoDAO.create(newUser);
        done(null, newUserResponse._doc);
        return;
      }
      done(null, user);
    }
    catch(error) {
      done(error);
    }
  }
));

const passportCustom = (strategy, options = {}) =>{
  return async(req, res, next) =>{
      await passport.authenticate(strategy, {session: false, ...options},
          (error, user, info) => {
          if(error){
              return next(error)
          }
          if(!user){
              return res.status(HTTP_STATUS.UNAUTHORIZED).send({error: info?.messages ?? `${info}`})
          }
          req.user = user
          next()
      })(req, res, next)
  }
}

module.exports = { 
    passportCustom
};