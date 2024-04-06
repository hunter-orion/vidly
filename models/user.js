const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,   
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: Boolean,
    roles: []
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign( { _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const complexityOptions = {
        min: 5,
        max: 1024,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4,
    };

    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions).required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
