const express = require('express');
const router = express.Router();

const { jwt } = require('../helpers/auth');
const controller = require('../controllers/timeline.controller');

// get all tasks
router.get('/find', [jwt.verifyToken, controller.timelines]);

// get task by id
router.get('/find/:id', [jwt.verifyToken, controller.timeline]);

// create task (developer)
router.post('/create', [jwt.verifyToken, jwt.isDeveloper, controller.create]);

// edit task by id (developer)
router.put('/edit/:id', [jwt.verifyToken, jwt.isDeveloper, controller.edit]);

// delete task by id (developer)
router.delete('/delete/:id', [jwt.verifyToken, jwt.isDeveloper, controller.delete]);

module.exports = router;
