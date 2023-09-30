const { auth } = require('../helpers/auth');
const controller = require('../controllers/auth.controller');

var express = require('express');
var router = express.Router();

router.post('/signup', async (req, res) => {
  // check is the user existed
  await auth.isUserExisted(req, res);

  if (res.statusCode !== 200) return;

  // check is the role existed
  await auth.isRolesExisted(req, res);

  if (res.statusCode !== 200) return;

  controller.signup(req, res);
});

router.post('/signin', (req, res) => {
  controller.signin(req, res);
});

router.post('/signout', (req, res) => {
  controller.signout(req, res)
});

module.exports = router;
