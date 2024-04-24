const Joi = require('joi')
const {Movie} = require('../models/movie')
const {Rental} = require('../models/rental')
const validator = require('../middleware/validate')
const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()

router.post('/', [auth, validator(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId)

    if (!rental) return res.status(404).send('rental not found')

    if(rental.dateReturned) return res.status(400).send('return already processed')

    rental.return();

    await  rental.save();

    await Movie.updateOne({ _id: rental.movie._id}, {
      $inc: {numberInStock: 1}
    })

    return res.send(rental)
})

function validateReturn(req) {
  const schema = Joi.object ({
      customerId: Joi.string().hex().length(24),
      movieId: Joi.string().hex().length(24)
      
   });
   return schema.validate(req); 

  }


module.exports = router;