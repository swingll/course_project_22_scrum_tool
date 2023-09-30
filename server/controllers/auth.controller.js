var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const db = require('../models');
const { jwt: { JWT_SECRET } } = require('../helpers/auth');
const User = db.user;
const Role = db.role;

exports.signup = (req, res) => {
    // make sure username and email is not empty
    if (!req.body.password) {
        res.status(500).send({ message: 'Password cannot be empty' });
        return;
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, user) => {
        if (err) return;

        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles },
            }, (err, roles) => {
                if (err)  return;

                user.roles = roles.map((role) => role._id);
                user.save((err) => {
                    if (err) return;

                    res.send({ message: "User is registered successfully" });
                });
            });
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) return;

                user.roles = [role._id];
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User is registered successfully" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    // make sure username and password is not empty
    if (!req.body.username || !req.body.password) {
        res.status(500).send({ message: 'Username and Password cannot be empty' });
        return;
    }

    User.findOne({
        username: req.body.username,
    }).populate("roles", "-__v")
      .exec((err, user) => {
        if (err) return;

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var isValidPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(401).send({ message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user.id },
            JWT_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }

        req.session = { token };

        res.status(200).send({
            info: {
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
            },
            token
        });
    });
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out" });
    } catch (err) {
        this.next(err);
    }
};
