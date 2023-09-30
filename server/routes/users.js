const express = require('express');
const router = express.Router();

const { jwt } = require('../helpers/auth');
const controller = require('../controllers/user.controller');

router.get('/', [jwt.verifyToken, jwt.isAdmin, controller.users]);

router.get('/:id', [jwt.verifyToken, controller.users]);

router.put('/edit', [jwt.verifyToken, controller.edit]);

router.put('/edit/:id', [jwt.verifyToken, jwt.isAdmin, controller.users]);

router.delete('/delete/:id', [jwt.verifyToken, jwt.isAdmin, controller.delete]);

module.exports = router;