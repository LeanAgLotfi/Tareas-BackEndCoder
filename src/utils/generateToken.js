const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../constants/constants');

const generateToken = (user)=>{
    const token = jwt.sign({user}, SECRET_KEY, {expiresIn: '24hs'});
    return token;
}

module.exports={
    generateToken
};