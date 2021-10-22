const authService = require("../services/auth-service.js");
const { JWT_SECRET, TOKEN_COOKIE_NAME } = require('../config/config.json');
const houseService = require('../services/house-serive.js');

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

async function isOwner(req, res, next) {
    const house = await houseService.getOne(req.params.houseId);

    if(house.owner == req.user?._id){
        console.log(house.owner == req.user?._id);
        req.user.isOwner === true;
        console.log(req.user.isOwner);
        return next();
    }

    return res.render('auth/login', { error: 'You are not authorized to view this page, please login/regiter' });

}
module.exports = { authentication, authorization,isOwner }