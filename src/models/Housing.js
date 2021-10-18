const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [6, 'Name must be at least 6 characters'],
    },
    type: {
        type: String,
        required: true,
        minlength: [4, 'Type must be at least 5 characters'],
    },
    year: {
        type: Number,
        required: true,
        min:1850,
        max:2021,
    },
    city: {
        type: String,
        required: true,
        minlength: [4, 'Type must be at least 5 characters']
    },
    homeImg: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\//i.test(v);
            }
        }
    },
    propertyDescription: {
        type: String,
        required: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: 60
    },
    availablePieces: {
        type: Number,
        required: true,
        min:0,
        max:10
    },
    tenants: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Homes = mongoose.model('Homes',houseSchema);

module.exports = Homes;
