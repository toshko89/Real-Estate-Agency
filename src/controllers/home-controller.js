const homeController = require('express').Router();
const authentication = require('../middleWares/auth-middleware.js');
const houseSerice = require('../services/house-serive.js');


homeController.get('/',async (req,res)=>{
    try {
        const house = await houseSerice.getLatestThree();
        res.render('home',{house,title:'Home Page'});
    } catch (error) {
        console.log(error);
    }
});



module.exports = homeController;