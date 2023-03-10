const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userCollection = 'users';

const userSchema = new mongoose.Schema({
   last_name: { type: String },
  email: { type: String, unique: true },
  age: { type: Number },
  password: { type: String },
  githubLogin: {type:String, unique: true},
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
},
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'carts'
    }
]
    
});

const UserModel = mongoose.model(userCollection, userSchema)

module.exports = {
  UserModel
};