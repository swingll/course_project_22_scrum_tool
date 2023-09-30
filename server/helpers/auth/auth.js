const db = require('../../models');

const ROLES = ['admin', 'user', 'developer', 'reviewer'];
const User = db.user;

isUserExisted = (req, res, next) => {
    // search username in db
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        // if error occurred
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        // if user exist
        if (user) {
            res.status(400).send({ message: 'Username is already in use' });
            return;
        }

        // if user not existed
        // search email in db
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: 'Email is already in use' });
                return;
            }

            next();
        });
    });
};
  
isRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({ message: `Role ${req.body.roles[i]} does not exist`});
                return;
            }
        }
    }

    next();
};

module.exports = { isUserExisted, isRolesExisted };