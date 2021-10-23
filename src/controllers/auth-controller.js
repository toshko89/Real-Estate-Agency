const authController = require('express').Router();

const config = require('../config/config.json')
const User = require('../models/User.js');
const authService = require('../services/auth-service.js');


authController.get('/login', (req, res) => {
    res.render('auth/login')
});

authController.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        let userToken = await authService.login(username, password);
        res.cookie(config.TOKEN_COOKIE_NAME, userToken, { httpOnly: true });
        res.redirect('/')

    } catch (error) {
        console.log(error);
        res.render('auth/login', { error: error.message });
    }
});

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    try {
        let { name, username, password, rePassword } = req.body;

        if (password !== rePassword) {
            throw new Error('Password doesn\'t match, please try again');
        }
        if (name.trim() == '' && username.trim() == '' && password.trim() == '' && rePassword.trim() == '') {
            throw new Error('All fields are required!');
        }

        const userCheck = await User.findUser(username);
        if (userCheck) {
            throw new Error('Username is taken, please try again')
        }

        const user = await authService.addUser(name, username, password);
        const token = authService.createToken(user);
        res.cookie(config.TOKEN_COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.render('auth/register', { error: error.message });
    }

});

authController.get('/logout', (req, res) => {
    res.clearCookie(config.TOKEN_COOKIE_NAME);
    res.redirect('/');
})

module.exports = authController;