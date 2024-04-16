const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function () {mongoose.connect('mongodb://localhost/Vidly')
.then(() => winston.info('connected to mongo DB...'))

}