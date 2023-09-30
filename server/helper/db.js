const db = require('../models/index.js');

module.exports = () => {

    // initial connection uri, defual localhost if not set in .env
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

    // initial connection options
    const options = { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true };
    
    // open MonogoDB connection
    db.mongoose.connect(uri, options);

    // connection open listener
    db.mongoose.connection.on('open', () => {
        console.log('Connection OK');
    });

    // connection error listener
    db.mongoose.connection.on('error', (err) => {
        console.log('Connection Fail', err);
    });

}