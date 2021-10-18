const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, 'Name must be at least 5 characters'],
    },
    type: {
        type: String,
        required: true,
        minlength: [4, 'Type must be at least 5 characters'],
    },
    year: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
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
        maxlength: 500
    },
    availablePieces: {
        type: Number,
        required: true
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
