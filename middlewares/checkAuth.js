const jwt = require("jsonwebtoken");

const checkAuth = function(req,res,next) {
    const {JWT_SECRET_KEY} = process.env;

    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, JWT_SECRET_KEY, (err,decoded) => {
            if(err) {
                return next(new CustomError("You are not authorized to access this route",401));
            }
            req.user = {
                id: decoded.id,
                name: decoded.name
            }
            next();
        });
    }
    catch(err) {
        return res.status(401).send({
            message: "Auth failed"
        });
    }
}

module.exports = {
    checkAuth
}