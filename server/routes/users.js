const express = require('express');
const router = express.Router();

const { jwt } = require('../helpers/auth');
const controller = require('../controllers/user.controller');

// get all users
router.get('/', [jwt.verifyToken, jwt.isAdmin, controller.users]);

// get user by id
router.get('/:id', [jwt.verifyToken, controller.users]);

// edit user own password
router.put('/edit', [jwt.verifyToken, controller.edit]);

// edit any user password (admin)
router.put('/edit/:id', [jwt.verifyToken, jwt.isAdmin, controller.users]);

// delete user by id (admin)
router.delete('/delete/:id', [jwt.verifyToken, jwt.isAdmin, controller.delete]);

module.exports = router;