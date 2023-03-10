const UsersMongoDAO = require("../user.mongo");


const getDaos = () => {
  return {
    usersDao: new UsersMongoDAO(),
  }
};

module.exports = getDaos;