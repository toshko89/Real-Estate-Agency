const houseController = require('express').Router();
const houseService = require('../services/house-serive.js');
const { authorization, isOwner } = require('../middleWares/auth-middleware.js');
const { isRentedByCurrentUser } = require('../helpers/houseHelper.js');

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
        res.render('house-pages/create', { error: error.message });
    }
});

houseController.get('/rent', async (req, res) => {
    try {
        const houses = await houseService.getAll();
        res.render('house-pages/rent', { houses })
    } catch (error) {
        console.log(error);
        res.render('house-pages/rent', { error: error.message });
    }
});

houseController.get('/:houseId', async (req, res) => {
    try {
        const house = await houseService.getOne(req.params.houseId);
        const isOwnHouse = house.owner._id == req.user?._id;
        const isAvailable = house.availablePieces > 0;
        const isRented = await isRentedByCurrentUser(req.params.houseId, req.user);
        const tenantsNames = house.tenants.map(user => user.name).join(', ');
        res.render('house-pages/details', { isOwnHouse, isRented, isAvailable, tenantsNames, ...house, title: 'Rent a house' });
    } catch (error) {
        console.log(error);
        res.render('house-pages/details', { title: 'Reant a house', error: error.message });
    }
});

houseController.get('/:houseId/rent', async (req, res) => {
    try {
        await houseService.addTenant(req.params.houseId, req.user._id);
        res.redirect(`/houses/${req.params.houseId}`);
    } catch (error) {
        console.log(error);
        res.render('house-pages/details', { error: error.message });
    }
});

houseController.get('/:houseId/edit', isOwner, async (req, res) => {
    try {
        const houseData = await houseService.getOne(req.params.houseId);
        res.render('house-pages/edit', { ...houseData, title: 'Edit' });
    } catch (error) {
        console.log(error);
        res.render('house-pages/edit', { error: error.message, title: 'Edit' });
    }
});

houseController.post('/:houseId/edit', isOwner, async (req, res) => {
    try {
        await houseService.updateHouse(req.params.houseId, req.body);
        res.redirect(`/houses/${req.params.houseId}`);
    } catch (error) {
        console.log(error);
        res.render('house-pages/edit', { error: error.message, title: 'Edit' });
    }
});

houseController.get('/:houseId/delete', isOwner, async (req, res) => {
    try {
        await houseService.deleteHouse(req.params.houseId);
        res.redirect('/houses/rent');
    } catch (error) {
        console.log(error);
        res.render(`/houses/${req.params.houseId}`, {error: error.message});
    }
});



module.exports = houseController;