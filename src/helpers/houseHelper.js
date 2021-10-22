const houseService = require('../services/house-serive.js');

exports.isRentedByCurrentUser = async function (houseId,user) {
    try {
        const house = await houseService.getOne(houseId);
        const isRentedByCurrentUser = house.tenants.some(x => x._id == user?._id);
        return isRentedByCurrentUser;
    } catch (error) {
        console.log(error);
    }
}
