const express = require('express');
const router = express.Router();

const { jwt } = require('../helpers/auth');
const controller = require('../controllers/task.controller');

// get all tasks
router.get('/find', [jwt.verifyToken, controller.tasks]);

// get task by id
router.get('/find/:id', [jwt.verifyToken, controller.task]);

// create task (developer)
router.post('/create', [jwt.verifyToken, jwt.isDeveloper, controller.create]);

// edit task by id (developer)
router.put('/edit/:id', [jwt.verifyToken, jwt.isDeveloper, controller.edit]);

// delete task by id (developer)
router.delete('/delete/:id', [jwt.verifyToken, jwt.isDeveloper, controller.delete]);

module.exports = router;