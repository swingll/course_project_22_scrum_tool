const express = require('express');
const router = express.Router();

const { jwt } = require('../helpers/auth');
const controller = require('../controllers/story.controller');

// get all stories
router.get('/find', [jwt.verifyToken, controller.stories]);

// get story by id
router.get('/find/:id', [jwt.verifyToken, controller.story]);

// create story (developer)
router.post('/create', [jwt.verifyToken, jwt.isDeveloper, controller.create]);

// edit story by id (developer)
router.put('/edit/:id', [jwt.verifyToken, jwt.isDeveloper, controller.edit]);

// count stories (developer)
router.get('/count', [jwt.verifyToken, jwt.isDeveloper, controller.count]);

// delete story by id (developer)
router.delete('delete/:id', [jwt.verifyToken, jwt.isDeveloper, controller.delete]);

module.exports = router;