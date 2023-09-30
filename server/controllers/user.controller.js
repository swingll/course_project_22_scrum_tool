var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Role = db.role;

exports.user = (req, res) => {
    const _id = req.query.id;

    User.findOne({ _id }).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        res.json(user);
    });
};

exports.users = (req, res) => {    
    User.find().exec((err, users) => {
        if (err) return res.status(500).send({ message: err });

        res.json(users);
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

exports.delete = (req, res) => {
    const _id = req.params.id;

    User.deleteOne({ _id }).exec((err, ret) => {
        if (err) return res.status(500).send({ message: err });
        
        return res.status(200).send({ message: `${ret.deletedCount} user have been deleted` });
    });
};
