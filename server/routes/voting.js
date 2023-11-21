const express = require('express');
const router = express.Router();

const { jwt } = require('../helpers/auth');
const controller = require('../controllers/voting.controller');

// get all votings
router.get('/find', [jwt.verifyToken, controller.votings]);

// get voting by id
router.get('/find/:id', [jwt.verifyToken, controller.voting]);

// get voting by id
router.get('/findByTask/:id', [jwt.verifyToken, controller.votingByTask]);

// create voting (developer)
router.post('/create', [jwt.verifyToken,  controller.create]);

// edit voting by id (developer)
router.put('/edit/:id', [jwt.verifyToken, controller.edit]);

// delete voting by id (developer)
router.delete('/delete/:id', [jwt.verifyToken, controller.delete]);

module.exports = router;
