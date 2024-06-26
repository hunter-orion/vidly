const auth = require('../middleware/auth')
const {Movie, validateMovie} = require('../models/movie')
const {Genre} = require('../models/genre')
const validate = require('../middleware/validate')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name')
    res.send(movies)
})

router.post('/', [auth, validate(validateMovie)], async (req, res) => {


const genre = await Genre.findById(req.body.genreId);
if (!genre) return res.status(404).send('genre Not Found')

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
        })

        await movie.save()
        
        res.send(movie)
})

router.put('/:id', [auth, validate(validateMovie)], async (req, res) => {

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        { 
          title: req.body.title,
          genre: {
            _id: genre._id,
            name: genre.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });
    
      if (!movie) return res.status(404).send('The movie with the given ID was not found.');
      
      res.send(movie);
    });


router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    
    if (!movie) return res.status(404).send('movie Not Found')
    res.send(movie)
})

router.get('/:id', async(req,res) => {
    const movie = await Movie.findById(req.params.id)
 
     if (!movie) return res.status(404).send('movie Not Found')
     res.send(movie)
     })
     
     module.exports = router; 