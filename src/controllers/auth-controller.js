const authController = require('express').Router();

authController.get('/login',(req,res)=>{
    res.render('auth/login')
})


module.exports = authController;