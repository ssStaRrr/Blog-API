const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/errors/CustomError");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");
const {sendJwtToClient} = require("../helpers/tokenHelpers");
const User = require("../models/User");

const userRegister = asyncHandler(async(req,res,next) => {
     const info = req.body;
     console.log(info);
      const user = new User({
         ...info
      });
    await user.save()
     .then(console.log(" save process is successful"))
     .catch(err => console.log(err));

    res.status(200);
    
});

const login = asyncHandler( async(req,res,next) => {
    const {email,password} = req.body;
    console.log(email,password);
    if(!validateUserInput(email,password)){
        return next(new CustomError("Please check your inputs",400));
    };
    
    const user = await User.findOne({email}).select("+password");

    if(!comparePassword(password,user.password)){
        return next(new CustomError("Please check your credentials",400));
    }
    sendJwtToClient(user,res);
});

const chechUserWithUsername = asyncHandler( async(req,res,next) => {
    const {username} = req.params;
    const user = await User.findOne({username}).select("+password");
    req.user = {
        id: user._id    
    }
    console.log(user);
    next();
});

module.exports = {
    userRegister,
    login,
    chechUserWithUsername
};
