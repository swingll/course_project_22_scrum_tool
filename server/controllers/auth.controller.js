var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const { jwt: { JWT_SECRET } } = require('../helpers/auth');
const db = require('../models');
const User = db.user;
const Role = db.role;

exports.signup = (req, res) => {
    // make sure username and email is not empty
    if (!req.body.email && !req.body.username) {
        res.status(500).send({ message: 'Email and username at least one of them cannot be empty' });
        return;
    }

    // make sure password is not empty
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
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find({ $or: [ { name: "user" }, { name: "developer" } ] }, (err, roles) => {
            if (err) return res.status(500).send({ message: err });

            if (!roles || roles.length == 0) return res.status(404).send({ message: 'Cannot find roles' });

            user.roles = roles.map(x => x._id);
            user.save((err) => {
                if (err) return res.status(500).send({ message: err });

                res.send({ message: "User is registered successfully" });
            });
        });
    });
};

exports.signin = (req, res) => {
    // make sure username and email is not empty
    if (!req.body.email && !req.body.username)
        return res.status(500).send({ message: 'Email and username at least one of them cannot be empty' });

    // make sure username and password is not empty
    if (!req.body.password)
        return res.status(500).send({ message: 'Password cannot be empty' });

    const query = req.body.email ? { email: req.body.email } : { username: req.body.username };

    User.findOne(query)
      .populate("roles", "-__v")
      .select('+password')
      .exec((err, user) => {
        if (err) return;

        if (!user)
            return res.status(404).send({ message: "User Not found." });

        var isValidPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isValidPassword)
            return res.status(401).send({ message: "Invalid Password" });

        const token = jwt.sign({ id: user.id },
            JWT_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++)
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());

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
