const Housing = require('../models/Housing.js');

const getAll = async () => Housing.find({}).populate('tenants').populate('owner').lean();

async function getOne(houseId){
    return Housing.findById(houseId).lean();
};

const getLatestThree = async () => await Housing.find({}).sort({ _id: 1 }).limit(3).lean();

async function createHouse(house) {
    return Housing.create(house);
};

async function search(search) {
    return Housing.find({ type: { $regex: search, $options: 'i' } }).lean();
};

async function updateHouse(houseId,newData){
    return Housing.findByIdAndUpdate(houseId,newData);
};

async function deleteHouse(houseId){
    return Housing.findByIdAndDelete(houseId);
};

const houseSerice = {
    getAll,
    getOne,
    search,
    createHouse,
    updateHouse,
    deleteHouse,
    getLatestThree,
}

module.exports = houseSerice;