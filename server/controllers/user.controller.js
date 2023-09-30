var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Role = db.role;

exports.users = (req, res) => {    
    User.find().exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        res.json(user);
    });
};

exports.edit = (req, res) => {
    // if password is empty
    if (!req.body.password) return res.status(500).send({ message: 'Password cannot be empty' });

    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        user.password = bcrypt.hashSync(req.body.password, 8)

        user.save((err) => {
            if (err) return res.status(500).send({ message: err });

            res.status(200).send({ message: 'Password have been changed' });
        });
    });
};
