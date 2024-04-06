
module.exports = function(error, req, res, next){
    //log exceiption 
    res.status(500).send('Something Failed.')
}
