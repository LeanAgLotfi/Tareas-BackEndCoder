//ENCRIPTADO DE PASSWORD
const bcrypt = require('bcrypt');
//ENCRIPTAR PASSWORD
const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//VALIDAR Y COMPARAR EL ENCRIPTADO
const isValidPassword = (userDB, password) => bcrypt.compareSync(password, userDB.password);

module.exports = {
  hashPassword,
  isValidPassword,
};