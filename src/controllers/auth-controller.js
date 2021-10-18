const authController = require('express').Router();

const { addUser } = require('../services/auth-service.js');


authController.get('/login', (req, res) => {
    res.render('auth/login')
})


authController.get('/register', (req, res) => {
    res.render('auth/register')
})

authController.post('/register', async (req, res) => {
    try {
        let { name, username, password, rePassword } = req.body;

        if (password !== rePassword) {
            throw new Error('Password doesn\'t match, please try again')
        }
        if (name.trim() != '' && username.trim() != '' && password.trim() != '' && rePassword.trim() != '') {
            await addUser(name,username,password);
            
        }
    } catch (error) {

    }




})

module.exports = authController;