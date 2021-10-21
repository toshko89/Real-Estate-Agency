const homeController = require('express').Router();
const houseService = require('../services/house-serive.js');
const { authorization } = require('../middleWares/auth-middleware.js')

homeController.get('/', async (req, res) => {
    try {
        const houses = await houseService.getLatestThree();
        res.render('home', { houses, title: 'Home Page' });
    } catch (error) {
        console.log(error);
        res.render('home', { error });
    }
});

homeController.get('/search', authorization, (req, res) => {
    res.render('house-pages/search');
})

homeController.post('/search', authorization, async (req, res) => {
    try {
        let { search } = req.body;
        console.log(search)
        const houses = await houseService.search(search);
        console.log(houses);
        res.render('house-pages/search', { title: 'Search Page', houses });
    } catch (error) {
        res.render('house-pages/search', { error });
    }
});



module.exports = homeController;