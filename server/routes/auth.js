var express = require('express');
var router = express.Router();

const { auth } = require('../helpers/auth');
const controller = require('../controllers/auth.controller');

// sign up
router.post('/signup', [auth.isUserExisted, controller.signup]);

// sign in
router.post('/signin', [controller.signin]);

// sign out
router.post('/signout', [controller.signout]);

module.exports = router;
