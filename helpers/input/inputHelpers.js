const asyncHandler = require("express-async-handler");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

const validateUserInput = async(email,password)=> {
    return email &&  password;   //eğer email,password undefined ise return False dönecek.
}; 

const comparePassword = (passwordInput,passwordCompared) => {
   return bcrypt.compareSync(passwordInput, passwordCompared);
}
module.exports = {
    validateUserInput,
    comparePassword
}