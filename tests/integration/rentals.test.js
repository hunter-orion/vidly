const moment = require('moment')
const request = require('supertest')
const {Movie} = require('../../models/movie');

const {User} = require('../../models/user');
const mongoose = require ('mongoose');


describe('/api/rentals', () => {
    let server;
    let customerId;
    let movieId;
    let token;
    let movie;

    const exec = () => {
    return request(server)
      .post('/api/rentals')
      .set('x-auth-token', token)
      .send({ customerId, movieId})
        }

    beforeEach( async () => {
        server = require('../../index');
        
        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        token = new User().generateAuthToken(); 
      
        movie = new Movie({
          _id: movieId,
          title: '12345',
          dailyRentalRate:2,
          genre: { name: '12345'},
          numberInStock: 10,
        })

        await movie.save()
           
    });
    afterEach(async () => {
        await server.close(); 
        await Movie.deleteMany({});
    });

    it('should return 401 if client is not logged in', async () => {

        token = '';
        
        const res = await exec()
        
        expect(res.status).toBe(401)
    })

    it('should return 400 if customer id not provided', async () => {

        customerId = ''
        
        const res = await exec()
        
        expect(res.status).toBe(400)
    })

    it('should return 400 if movie id is not provided', async () => {
        movieId = ''
  
        const res = await exec()
  
        expect(res.status).toBe(400)
      });
});