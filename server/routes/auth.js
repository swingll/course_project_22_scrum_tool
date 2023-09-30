var express = require('express');
var router = express.Router();

const { auth } = require('../helpers/auth');
const controller = require('../controllers/auth.controller');

router.post('/signup', [auth.isUserExisted, auth.isRolesExisted, controller.signup]);

router.post('/signin', [controller.signin]);

router.post('/signout', [controller.signout]);

module.exports = router;
