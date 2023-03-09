const { Schema, model } = require('mongoose');
const { USER_ROLES } = require('../../constants/user.constants');

const userCollection = 'users';

const userSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  age: { type: Number },
  password: { type: String },
  githubLogin: {type:String, unique: true},
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: 'user',
    required: true
},
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'carts'
    }
]
    
});

const UserModel = model(userCollection, userSchema);

module.exports = {
  UserModel
};