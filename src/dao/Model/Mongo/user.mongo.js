const UserModel = require('../user.model-DESKTOP-DHLB9F0')

class UsersMongoDAO {

    async getByEmail(email) {
        const user = await UserModel.findOne({ email }, { __v: false }).lean();
        return user;
      }

      async create(payload) {
        const newUser = await UserModel.create(payload);
        return newUser;
      }
};

module.exports = {
    UsersMongoDAO
};