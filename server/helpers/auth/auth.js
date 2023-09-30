const db = require('../../models');

const ROLES = ['admin', 'user', 'developer', 'reviewer'];
const User = db.user;

isUserExisted = (req, res, next) => {
    console.log(req)
    // make sure username and email is not empty
    if (!req.body.username || !req.body.email) {
        res.status(500).send({ message: 'Username and email cannot be empty' });
        return;
    }

    // check the email format
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        res.status(500).send({ message: 'Invalid email format' });
        return;
    }

    // search username in db
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        // if error occurred
        if (err) return;

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
            if (err) return;

            if (user) {
                res.status(400).send({ message: 'Email is already in use' });
                return;
            }

            next();
        });
    });
};
  
isRolesExisted = (req, res, next) => {
    const roles = (req.body.roles && Array.isArray(req.body.roles) && req.body.roles.length > 1) ? req.body.roles : ['user'];

    for (let i = 0; i < roles.length; i++) {
        if (!ROLES.includes(roles[i])) {
            res.status(404).send({ message: `Role ${roles[i]} does not exist`});
            return;
        }
    }

    next();
};

module.exports = { isUserExisted, isRolesExisted };