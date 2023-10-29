const express = require('express');
const router = express.Router();

const { jwt } = require('../helpers/auth');
const controller = require('../controllers/voting.controller');

// get all tasks
router.get('/find', [jwt.verifyToken, controller.votings]);

// get task by id
router.get('/find/:id', [jwt.verifyToken, controller.voting]);

// create task (developer)
router.post('/create', [jwt.verifyToken,  controller.create]);

// edit task by id (developer)
router.put('/edit/:id', [jwt.verifyToken, controller.edit]);

// delete task by id (developer)
router.delete('/delete/:id', [jwt.verifyToken, controller.delete]);

module.exports = router;
