const jwt = require('jsonwebtoken');
const db = require('../../models');
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.session.token;

    if (!token) return res.status(403).send({ message: 'No token provided!' });

    const secret = process.env.JWT_SECRET || 'SrV7fUl8S3xqgsRjDGOtpGqn9pXgqZIGdwgCbP4uLFn3bjXGEJB2xD9JpzS1c9h';

    jwt.verify( token, secret,
        (err, decoded) => {
            if (err) return res.status(401).send({ message: 'Unauthorized' });
            req.userId = decoded.id;
            next();
        });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find({
      _id: { $in: user.roles },
    }, (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (roles.includes('admin')) {
          next();
          return;
        }

        res.status(403).send({ message: 'Require Admin Role!' });
        return;
      }
    );
  });
};

isDeveloper = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find({
        _id: { $in: user.roles },
      }, (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (roles.includes('developer')) {
          next();
          return;
        }

        res.status(403).send({ message: 'Require Developer Role' });
        return;
      }
    );
    });
};

module.exports = { verifyToken, isAdmin, isDeveloper };
