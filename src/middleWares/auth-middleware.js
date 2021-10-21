const authService = require("../services/auth-service.js");
const { JWT_SECRET, TOKEN_COOKIE_NAME } = require('../config/config.json');

function authentication(req, res, next) {
    const token = req.cookies[TOKEN_COOKIE_NAME];

    if (!token) {
        return next();
    }

    const tokenVerify = authService.verifyToken(token, JWT_SECRET);

    if (!tokenVerify) {
        res.render('auth/login', { error: 'You are not authorized to view this page, please login/regiter' });
        return next()
    }

    const user = {
        _id: tokenVerify._id,
        username: tokenVerify.username
    }

    req.user = user;
    res.locals.user = user;
    next();
}

function authorization(req, res, next) {

    if (!req.user) {
      return res.render('auth/login', { error: 'You are not authorized to view this page, please login/regiter' });
    }
    next();

};
module.exports = { authentication, authorization }