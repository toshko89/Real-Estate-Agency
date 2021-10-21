const homeController = require('express').Router();
const authentication = require('../middleWares/auth-middleware.js');
const houseSerice = require('../services/house-serive.js');
const { authorization } = require('../middleWares/auth-middleware.js')

homeController.get('/', async (req, res) => {
    try {
        const houses = await houseSerice.getLatestThree();
        res.render('home', { houses, title: 'Home Page' });
    } catch (error) {
        console.log(error);
    }
});

homeController.get('/search', authorization, (req, res) => {
    try {
        let search = req.query
        console.log(search);
        res.render('house-pages/search');
        // const houses = await houseService.sarch()
    } catch (error) {
        console.log(error);
    }
});



module.exports = homeController;