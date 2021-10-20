const houseController = require('express').Router();
const houseService = require('../services/house-serive.js');
const { authentication, authorization } = require('../middleWares/auth-middleware.js');


houseController.use(authentication);
houseController.use(authorization);

houseController.get('/create', (req, res) => {
    console.log(req.user)
    res.render('house-pages/create', { title: 'Create new offer' });
})

houseController.post('/create', async (req, res) => {
    console.log(req.user);
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
        res.render('house-pages/rent', {houses})
    } catch (error) {

    }
});


module.exports = houseController;