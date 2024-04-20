const winston = require('winston')
//  require('winston-mongodb')
 require('express-async-errors')


 module.exports = function() {
    winston.exceptions.handle(
    new winston.transports.Console( { colorized: true, prettyPrint: true}),
    new winston.transports.File({ filename: 'uncaughtExceptions.log'})
)
process.on('unhandledRejection', (ex) => {
    throw(ex)
})

winston.add(new winston.transports.File({ filename: "logfile.log", 
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
        )
    }))
    winston.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));

// winston.add(new winston.transports.MongoDB({
//      db: 'mongodb://localhost/Vidly', 
//      level: 'info', 
//      options: { useUnifiedTopology: true }
//      } ))
    }