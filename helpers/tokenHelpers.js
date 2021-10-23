const jwt = require("jsonwebtoken");

const sendJwtToClient = function(user,res){
    //Generate JWT TOKEN
    const {JWT_SECRET_KEY, JWT_EXPIRE, JWT_COOKIE_EXPIRE} = process.env;
    const payload = {
        email: user.email,
        id: user._id
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRE});
    
    res.status(200)
    .cookie("access_token",token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE)*60*1000)
    })
    .json({
        token: token,
        data: {
            email: user.email,
            id: user._id
        }
    });
}

module.exports = {
    sendJwtToClient
}
