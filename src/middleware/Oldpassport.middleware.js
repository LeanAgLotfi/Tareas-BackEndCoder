const GithubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const { UserModel } = require('../dao/Model/user.model-DESKTOP-DHLB9F0');
const { hashPassword, isValidPassword } = require('./utils');

// Login Local strategy
passport.use('register', new LocalStrategy(
    { usernameField: 'email'},
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
          done(null, false);
        } else {
          if (!isValidPassword(user, password)) {
            done(null, false);
          } else {
            const sessionUser = {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              age: user.age,
              email: user.email
            };
            done(null, sessionUser);
          }
        }
      }
      catch(error) {
        done(error);
      }
    }
  ));
  
  // Register Local strategy
  passport.use('login', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      const { first_name, last_name, age } = req.body;
      try {
        const user = await UserModel.findOne({ email: username});
        if (user) {
          done(null, false);
        } else {
          const newUser = {
            first_name,
            last_name,
            age,
            email: username,
            password: hashPassword(password)
          };
          const userDB = await UserModel.create(newUser);
          const sessionUser = {
            _id: userDB._id,
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            age: userDB.age,
            email: userDB.email
          };
          done(null, sessionUser);
        }
      }
      catch(error){
        done(error);
      }
    }
  ));

// Github strategy
passport.use(
  new GithubStrategy({
    clientID: 'Iv1.27cc1d5f10913cbd',
    clientSecret: '0985b86455f70a7b72731c5ccadabc4963f7f61e',
    callbackURL: 'http://localhost:8080/api/github/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
       console.log(profile);
      const userData = profile._json;
      const user = await UserModel.findOne({ email: userData.email});
      if (!user) {
        const newUser = {
          first_name: userData.name.split(" ")[0],
          last_name: userData.name.split(" ")[1],
          age: userData.age || null,
          email: userData.email || null,
          password: null,
          githubLogin: userData.login
        };
        const response = await UserModel.create(newUser);
        console.log('usuario creado');
        done(null, response._doc);
      } else {
        console.log('usuario registrado');
        done(null, user);
      }
    }
    catch(error) {
      done(error);
    }
  }
));


module.exports = passportStrategy;