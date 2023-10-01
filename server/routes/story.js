const express = require('express');
const router = express.Router();

const { jwt } = require('../helpers/auth');
const controller = require('../controllers/story.controller');

// get all stories
router.get('/', [jwt.verifyToken, controller.stories]);

// get story by id
router.get('/:id', [jwt.verifyToken, controller.story]);

// create story (developer)
router.post('/', [jwt.verifyToken, jwt.isDeveloper, controller.create]);

// edit story by id (developer)
router.put('/:id', [jwt.verifyToken, jwt.isDeveloper, controller.edit]);

// count stories (developer)
router.get('/count', [jwt.verifyToken, jwt.isDeveloper, controller.count]);

// delete story by id (developer)
router.delete('/:id', [jwt.verifyToken, jwt.isDeveloper, controller.delete]);

module.exports = router;