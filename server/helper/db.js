const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = () => {

    // initial connection uri, defual localhost if not set in .env
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

    // initial connection options
    const options = { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true };
    
    // open MonogoDB connection
    mongoose.connect(uri, options);

    // connection open listener
    mongoose.connection.on('open', () => {
        console.log('Connection OK');
    });

    // connection error listener
    mongoose.connection.on('error', (err) => {
        console.log('Connection Fail', err);
    });

}