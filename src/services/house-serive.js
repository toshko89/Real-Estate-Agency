const Housing = require('../models/Housing.js');

const getAll = () => Housing.find({}).populate('tenants').populate('owner').lean();

const getLatestThree = () => Housing.find({}).sort({ _id: 1 }).limit(3);

async function createHouse(house){
   return Housing.create(house);
}



const houseSerice = {
    getAll,
    getLatestThree,
    createHouse
}

module.exports = houseSerice;