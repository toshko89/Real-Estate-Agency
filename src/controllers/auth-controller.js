const authController = require('express').Router();

authController.get('/login',(req,res)=>{
    res.render('auth/login')
})


authController.get('/register',(req,res)=>{
    res.render('auth/register')
})

module.exports = authController;