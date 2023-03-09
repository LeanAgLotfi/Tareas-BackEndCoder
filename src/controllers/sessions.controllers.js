const { UsersMongoDAO } = require("../dao/Model/Mongo/user.mongo.js"); 
const { HTTP_STATUS } = require("../constants/api.constants.js");
const { SECRET_KEY } = require("../constants/constants.js");
const { UserModel } = require("../dao/Model/user.model-DESKTOP-DHLB9F0");
const { apiSuccessResponse } = require('../utils/api.utils');
const generateToken = require('../utils/generateToken');


class SessionsController {

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({email});
      if (!user || user.password !== password) {
        throw new error(HTTP_STATUS.BAD_REQUES, "Wrong email or password");
      }
      const access_token = generateToken(user);
      res.cookie(SECRET_KEY, access_token, {
        maxAge: 60 * 60 * 60 * 24 * 1000,
        httpOnly: true
      });
      const response = apiSuccessResponse("User logued in successfully!");
      //return res.json(response);
      res.redirect('/products');
    }
    catch(error) {
      next(error);
    }
  }

static async loginGithub(req, res, next) {
    const user = req.user;
    const access_token = generateToken(user);
    res.cookie(SECRET_KEY, access_token, {
      maxAge: 60 * 60 * 60 * 24 * 1000,
      httpOnly: true
    });
    const response = apiSuccessResponse("User logued in successfully with github!");
    //return res.json(response);
    res.redirect('/products');
  }

  static async logout(req, res, next){
    try {
        res.clearCookie(SESSION_KEY);
        res.redirect('/');
    } catch (error) {
        next(error) 
    }
}


  static async currentSession(req, res, next) {
    const response = apiSuccessResponse(req.user);
    return res.json(response);
  }
}

module.exports ={
  SessionsController
};