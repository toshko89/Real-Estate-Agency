const houseController = require('express').Router();
const houseService = require('../services/house-serive.js');
const { authorization } = require('../middleWares/auth-middleware.js');

houseController.get('/create', authorization, (req, res) => {
    res.render('house-pages/create', { title: 'Create new offer' });
})

houseController.post('/create', authorization, async (req, res) => {
    try {
        let { name, type, year, city, homeImage, description, availablePieces } = req.body;
        let newHouse = {
            name,
            type,
            year,
            city,
            homeImage,
            description,
            availablePieces,
            owner: req.user._id
        }
        await houseService.createHouse(newHouse);
        res.redirect('/houses/rent');
    } catch (error) {
        console.log(error);
        res.render('house-pages/create', { error: error });
    }
});

houseController.get('/rent', async (req, res) => {
    try {
        const houses = await houseService.getAll();
        res.render('house-pages/rent', { houses })
    } catch (error) {
        console.log(error);
        res.render('house-pages/rent', { error: error });
    }
});

houseController.get('/:houseId', async (req, res) => {
    try {
        const house = await houseService.getOne(req.params.houseId);
        res.render('house-pages/details', { title: 'Search Page', ...house });
    } catch (error) {
        console.log(error);
        res.render('house-pages/details', { title: 'Search Page', error });
    }
})

module.exports = houseController;