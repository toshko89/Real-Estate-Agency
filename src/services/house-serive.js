const Housing = require('../models/Housing.js');

const getAll = async () => Housing.find({}).populate('tenants').populate('owner').lean();

async function getOne(houseId){
    return Housing.findById(houseId).lean();
};

const getLatestThree = async () => await Housing.find().sort({ createdAt: -1 }).limit(3).lean();

async function createHouse(house) {
    return Housing.create(house);
};

async function search(search) {
    return Housing.find({ type: { $regex: search, $options: 'i' } }).lean();
};

async function updateHouse(houseId,newData){
    return Housing.findByIdAndUpdate(houseId,newData,{runValidators:true});
};

async function deleteHouse(houseId){
    return Housing.findByIdAndDelete(houseId);
};

async function addTenant(houseId,personId){
    return Housing.findByIdAndUpdate(
        {_id:houseId},
        {
            $push:{tenants:personId},
            $inc:{availablePieces:-1}
        },
        {runValidators:true}
        )
}

const houseSerice = {
    getAll,
    getOne,
    search,
    createHouse,
    updateHouse,
    deleteHouse,
    addTenant,
    getLatestThree,
}

module.exports = houseSerice;