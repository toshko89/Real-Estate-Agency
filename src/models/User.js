const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const _SALT = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, 'Name must be at least 5 characters'],
        validate: {
            validator: function (v) {
                return /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/i.test(v);
            }
        }
    },
    username: {
        type: String,
        required: true,
        minlength: [5, 'Username must be at least 5 characters'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Your password should be at least 4 characters'],
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, _SALT)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log(err);
        })
});

userSchema.static('findUser',function(username){
    return this.findOne({username}).lean();
});

const User = mongoose.model('User',userSchema);

module.exports = User;