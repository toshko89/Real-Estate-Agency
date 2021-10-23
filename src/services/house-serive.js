const Housing = require('../models/Housing.js');

const getAll = async () => Housing.find().populate('tenants').populate('owner').lean();

const getOne = async (houseId) => Housing.findById(houseId).populate('tenants').populate('owner').lean();

const getLatestThree = async () => await Housing.find().sort({ createdAt: -1 }).limit(3).lean();

const createHouse = async (house) => Housing.create(house);

const search = async (search) => Housing.find({ type: { $regex: search, $options: 'i' } }).lean();

const updateHouse = async (houseId, newData) => Housing.findByIdAndUpdate(houseId, newData, { runValidators: true });

const deleteHouse = async (houseId) => Housing.findByIdAndDelete(houseId);

const addTenant = async (houseId, personId) =>
    Housing.findByIdAndUpdate(
        { _id: houseId },
        {
            $push: { tenants: personId },
            $inc: { availablePieces: -1 }
        },
        { runValidators: true }
    )


const houseSerice = {
    getAll,
    getOne,
    search,
    addTenant,
    createHouse,
    updateHouse,
    deleteHouse,
    getLatestThree
}

module.exports = houseSerice;