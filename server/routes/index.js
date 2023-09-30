var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'CS5351 Group Project - 22Team',
    details: `Scrum & Agile Task Management Tool Database (MonogoDB)`,
    author: '@22Team'
  });
});

module.exports = router;
