var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Role = db.role;

exports.users = (req, res) => {    
    const users = User.find();
};

exports.edit = (req, res) => {
    // if password is empty
    if (!req.body.password) {
        res.status(500).send({ message: 'Password cannot be empty' });
        return;
    }

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        console.log(user.password)
        user.password = bcrypt.hashSync(req.body.password, 8)
        console.log(user.password)

        user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.status(200).send({ message: 'Password have been changed' });
        });
    });
};
