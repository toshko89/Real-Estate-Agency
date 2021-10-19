const houseController = require('express').Router();
const houseSerice = require('../services/house-serive.js');

houseController.get('/create',(req,res)=>{
    res.render('house-pages/create');
})

houseController.post('/create', async (req, res) => {
    try {
        let { name, type, year, city, homeImage, description, availablePieces } = req.body;

        await houseSerice.createHouse()
    } catch (error) {

    }
})


module.exports = houseController;