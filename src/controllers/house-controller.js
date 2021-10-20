const houseController = require('express').Router();
const houseSerice = require('../services/house-serive.js');

houseController.get('/create',(req,res)=>{
    res.render('house-pages/create',{title:'Create new offer'});
})

houseController.post('/create', async (req, res) => {
    try {
        let { name, type, year, city, homeImage, description, availablePieces } = req.body;
        let newHouse = {
            name,
            type,
            year,
            city,
            homeImage,
            description,
            availablePieces
        }

        await houseSerice.createHouse(newHouse);
        res.redirect('/rent');
    } catch (error) {
        console.log(error);
        res.render(`${req.originalUrl}`,{error});
    }
});

houseController.get('/rent',(req,res)=>{
    res.render('house-pages/rent',{title:'Rent a house'})
})


module.exports = houseController;