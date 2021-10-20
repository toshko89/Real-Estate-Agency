const Housing = require('../models/Housing.js');

const getAll = async () => Housing.find({}).populate('tenants').populate('owner').lean();

const getLatestThree = async () => await Housing.find({}).sort({ _id: 1 }).limit(3).lean();

async function createHouse(house) {
    return Housing.create(house);
}

const houseSerice = {
    getAll,
    getLatestThree,
    createHouse
}

module.exports = houseSerice;