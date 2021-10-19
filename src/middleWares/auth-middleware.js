const authService = require("../services/auth-service.js");
const {JWT_SECRET,TOKEN_COOKIE_NAME} = require('../config/config.json');

function authentication(req,res,next){
    const token = req.cookies[TOKEN_COOKIE_NAME];

    if(!token){
        return next();
    }

    const tokenVerify = authService.verifyToken(token,JWT_SECRET);

    if(!tokenVerify){
        res.status(401).render('auth/login',{error:'You are not authorized to view this page, please login/regiter'})
    }

    const user = {
        _id:tokenVerify._id,
        username:tokenVerify.username
    }
    
    req.user = user;
    req.locals.user = user;
    next();
}
module.exports = authentication;