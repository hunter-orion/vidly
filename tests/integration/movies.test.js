const request = require('supertest')
const {Movie} = require('../../models/movie');
const {Genre} = require('../../models/genre')
const {User} = require('../../models/user');
const mongoose = require ('mongoose');


describe('/api/movies', () => {
    let server;
    let movieId;
    let token;
    let movie;
    let genre;
    let genreId;

    const exec = () => {
    return request(server)
      .post('/api/movies')
      .set('x-auth-token', token)
      .send(movie)
        }
        const execput = () => {
            return request(server)
              .put('/api/movies/:id')
              .set('x-auth-token', token)
              .send(movie)
                }

    beforeEach( async () => {
        server = require('../../index');
        
        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        genreId = new mongoose.Types.ObjectId();
        token = new User().generateAuthToken(); 
      
        movie = new Movie({
          _id: movieId,
          title: '12345',
          dailyRentalRate:2,
          genre: { name: '12345'},
          numberInStock: 10,
        })

        genre = new Genre({
            _id: genreId,
            name: '123456',
            
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

    it('should return 400 if title not provided', async () => {

        movie.title = ''
        
        const res = await exec()
        
        expect(res.status).toBe(400)
    })

    it('should return 400 if genreId is not provided', async () => {
        genreId = ''
  
        const res = await exec()
  
        expect(res.status).toBe(400)
      }); 
      
      it('should return 400 if numberInStock is not provided', async () => {
        movie.numberInStock = ''
  
        const res = await exec()
  
        expect(res.status).toBe(400)
      });   
       it('should return 400 if dailyRentalRate is not provided', async () => {
        movie.dailyRentalRate = ''
  
        const res = await exec()
  
        expect(res.status).toBe(400)
      });

      //put

      it('should return 401 if client is not logged in', async () => {

        token = '';
        
        const res = await execput()
        
        expect(res.status).toBe(401)
    })

    it('should return 400 if title not provided', async () => {

        movie.title = ''
        
        const res = await execput()
        
        expect(res.status).toBe(400)
    })

    it('should return 400 if genreId is not provided', async () => {
        genreId = ''
  
        const res = await execput()
  
        expect(res.status).toBe(400)
      }); 
      
      it('should return 400 if numberInStock is not provided', async () => {
        movie.numberInStock = ''
  
        const res = await execput()
  
        expect(res.status).toBe(400)
      });   
       it('should return 400 if dailyRentalRate is not provided', async () => {
        movie.dailyRentalRate = ''
  
        const res = await execput()
  
        expect(res.status).toBe(400)
      });


});