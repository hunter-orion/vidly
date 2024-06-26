const auth = require('../middleware/auth')
const { Rental, validateRental} = require('../models/rental')
const {Movie} = require('../models/movie')
const {Customer} = require('../models/customer')
const validate = require('../middleware/validate')
const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut')
    res.send(rentals)
})

    router.post('/', [auth, validate(validateRental)], async (req, res) => {


        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send('Invalid Customer Id');
      
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('Invalid movie Id.');
      
        if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
      
        let rental = new Rental({ 
          customer: {
            _id: customer._id,
            name: customer.name, 
            phone: customer.phone
          },
          movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
          }
        });
        rental = await rental.save();
      
        movie.numberInStock--;
        movie.save();
        
        res.send(rental);
       
    });
    
//broken
        // with fawn
        // try{
        //     new Fawn.Task()
        //     .save('rentals', rental)
        //     .update('movies', {_id: movie._id}, {
        //         $inc: {numberInStock: -1}
        //     })
        //     .run()
        //     res.send(rental)
        // }
        //     catch(ex){
        //         res.status(500).send('failed')
        //     }
       

         //broken
    //     async function addRental() {
    //         const session = await mongoose.startSession();
    //         await session.withTransaction(async () => {
    //             try {
    //                 await rental.save({ session });
    //                 await movie.updateOne({ $inc: { numberInStock: -1 } }, { session });
    //                 await session.commitTransaction();
    //                 console.log("success"); 
    //             } catch (error) {
    //                 await session.abortTransaction();
    //                 console.log('error111', error.message);
    //                 throw error; // Re-throw the error to handle it in the outer catch block
    //             } finally {
    //                 session.endSession();
    //             }
    //         });
    //     }
      
    //     try {
    //         await addRental();
    //         res.send(rental); // Sending response outside the transaction block
    //     } catch (error) {
    //         res.status(500).send('Internal server error');
    //     }

module.exports = router; 