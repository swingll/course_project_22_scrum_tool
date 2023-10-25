const db = require('../../models');

module.exports = () => {

    // initial connection uri, defual localhost if not set in .env
    const uri = process.env.MONGODB_URI || 'mongodb://jira:132@45.32.89.193:27017/jira';

    // initial connection options
    const options = { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true };
    
    // open MonogoDB connection
    db.mongoose.connect(uri, options);

    // connection open listener
    db.mongoose.connection.on('open', () => {
        // console.log('Connected to MongoDB');
    });

    // connection error listener
    db.mongoose.connection.on('error', (err) => {
        // console.log('Connection Fail', err);
    });

}