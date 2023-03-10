const UserModel = require('../user.model-DESKTOP-DHLB9F0')

class UsersMongoDAO {

  async getAll() {
    const { limit = 20, page = 1 } = filter;
    const users = await UserModel.paginate({}, { limit, page });
    return users
  };

    async getByEmail(email){
      const user = await UserModel.findOne({email: email}).lean()
      return user
    };


    async getById(id){
      const user = await UserModel.findById(id).lean()
      return user
    };

    async create(payload) {
      const newUser = await UserModel.create(payload);
      return newUser;
    };

  
  async updateById(id, payload) {
    const updatedUser = await UserModel.findByIdAndUpdate(id, payload, { new: true });
    return updatedUser;
  }

  async deleteById(id) {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
  }

  async enrollToCourse(courseId, userId) {
    const updatedUser = await UserModel.updateOne({ _id: userId }, {
      $push: {
        courses: courseId
      }
    });
    return updatedUser;
  }
};

module.exports =  UsersMongoDAO;