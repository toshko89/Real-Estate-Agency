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
        const isOwner = house.owner == req.user?._id;
        res.render('house-pages/details', { isOwner, ...house, title: 'Details' });
    } catch (error) {
        console.log(error);
        res.render('house-pages/details', { title: 'Search Page', error });
    }
});

houseController.get('/:houseId/edit', async (req, res) => {
    try {
        const houseData = await houseService.getOne(req.params.houseId);
        res.render('house-pages/edit', { ...houseData, title: 'Edit' });
    } catch (error) {
        console.log(error);
        res.render('house-pages/edit', { error, title: 'Edit' });
    }
});

houseController.post('/:houseId/edit', async (req, res) => {
    try {
        await houseService.updateHouse(req.params.houseId, req.body);
        res.redirect(`/houses/${req.params.houseId}`);
    } catch (error) {
        console.log(error);
        res.render('house-pages/edit', { error, title: 'Edit' });
    }
});

houseController.get('/:houseId/delete', async (req, res) => {
    try {
        await houseService.deleteHouse(req.params.houseId);
        res.redirect('/rent')
    } catch (error) {
        console.log(error);
        res.render('/rent', error);
    }
})



module.exports = houseController;