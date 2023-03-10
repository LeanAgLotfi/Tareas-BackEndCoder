const { UsersMongoDAO } = require("../dao/Model/Mongo/user.mongo.js"); 
const { HTTP_STATUS } = require("../constants/status.constants");
const { SECRET_KEY } = require("../constants/constants.js");
const { UserModel } = require("../dao/Model/user.model-DESKTOP-DHLB9F0");
const { apiSuccessResponse } = require('../utils/api.utils');
const {generateToken} = require('../utils/generateToken');
const { hashPassword } = require("../middleware/utils.js");
const { getDaos } = require("../dao/Model/Mongo/daos/daos.factory");

class SessionsController {

  static async login(req, res, next){
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user || user.password !== password){
            throw new error(HTTP_STATUS.BAD_REQUEST, 'User not found')
        }
        const access_token = generateToken(user);
        res.cookie(SECRET_KEY, access_token, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true
        });
        const response = apiSuccessResponse("User logged in successfully!");
        // return res.json(response);
        res.redirect('/products');
    } catch (error) {
        next(error)
    }
} 


static async register(req, res, next){
  const { lastName, age ,email, password} = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user){
          throw new error(HTTP_STATUS.CREATED, 'User was created')
      }
      const newUser = {
        // firsName,
        lastName,
        age,
        email,
        password: hashPassword(password)
      };
      const access_token = generateToken(newUser);
      res.cookie(SECRET_KEY, access_token, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true
      });
      const response = apiSuccessResponse("User logged in successfully!");
      // return res.json(response);
      res.redirect('/api/view/products');
  } catch (error) {
      next(error)
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
    res.redirect('/api/view/products');
  }

  static async logout(req, res, next){
    try {
        res.clearCookie(SECRET_KEY);
        res.redirect('/api/view');
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