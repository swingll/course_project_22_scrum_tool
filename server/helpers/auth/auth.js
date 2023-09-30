const db = require('../../models');

// const ROLES = ['admin', 'user', 'developer', 'reviewer'];
const User = db.user;
const Role = db.role;

isUserExisted = (req, res, next) => {
    // make sure username and email is not empty
    if (!req.body.username || !req.body.email)
        return res.status(500).send({ message: 'Username and email cannot be empty' });

    // check the email format
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) 
        return res.status(500).send({ message: 'Invalid email format' });

    // search username in db
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        // if error occurred
        if (err) return res.status(500).send({ message: err });

        // if user exist
        if (user) return res.status(400).send({ message: 'Username is already in use' });

        // if user not existed
        // search email in db
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) return res.status(500).send({ message: err });

            if (user) return res.status(400).send({ message: 'Email is already in use' });

            next();
        });
    });
};
  
isRolesExisted = (req, res, next) => {
    const _roles = req.body.roles;

    if (!_roles || !Array.isArray(_roles) || _roles.length == 0)
        return res.status(500).send({ message: 'Roles cannot be empty' });

    Role.find()
        .exec((err, roles) => {
            if (err) return res.status(500).send({ message: err });

            const remain = _roles.filter(role => !roles.includes(role));

            if (remain.length > 0)
                return res.status(404).send({ message: `Role ${remain.split(', ')} does not exist`});

            next();
        });

    next();
};

module.exports = { isUserExisted, isRolesExisted };