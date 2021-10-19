const Housing = require('../models/Housing.js');

const getAll = () => Housing.find({}).populate('tenants').populate('owner').lean();

const getLatestThree = () => Housing.find({}).sort({ _id: 1 }).limit(3);



const houseSerice = {
    getAll,
    getLatestThree
}

module.exports = houseSerice;