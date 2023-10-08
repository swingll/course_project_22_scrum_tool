const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// db.project = require('./Project');
db.role = require('./Role');
db.story = require('./Story');
db.task = require('./Task');
db.user = require('./User');
db.timeline = require('./Timeline');
db.tlinedetail = require('./Tlinedetail');
db.tlineLink = require('./Tlinelink');

module.exports = db;
