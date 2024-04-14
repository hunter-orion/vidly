require('express-async-errors')
const winston = require('winston')
const error = require('./middleware/error')
const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies');
const rentals = require ('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const express = require('express')
const app = express()



    winston.add(new winston.transports.File({ filename: "logfile.log", 
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to logs
        winston.format.json())}))

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/Vidly')
.then(() => console.log('connected to mongo DB...'))
.catch(err => console.error('could not connect', err))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)  
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`on port ${port}...`));
