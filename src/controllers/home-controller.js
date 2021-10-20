const homeController = require('express').Router();
const authentication = require('../middleWares/auth-middleware.js');
const houseSerice = require('../services/house-serive.js');


homeController.get('/',async (req,res)=>{
    try {
        const houses = await houseSerice.getLatestThree();
        res.render('home',{houses,title:'Home Page'});
    } catch (error) {
        console.log(error);
    }
});



module.exports = homeController;