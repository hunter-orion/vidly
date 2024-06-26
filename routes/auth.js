
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const validate = require('../middleware/validate')

const { User} = require('../models/user')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Joi = require('joi');

router.post('/', async (req, res) => {
    const {error} = validateRequest(req.body)
    if(error) return res.status(400).send('Validation failed: ' + error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken()
    res.send(token)
   
});

function validateRequest(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(req);
}   

module.exports = router; 