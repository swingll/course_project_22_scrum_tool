const jwt = require('jsonwebtoken');
const db = require('../../models');
const User = db.user;
const Role = db.role;

const JWT_SECRET = process.env.JWT_SECRET || 'SrV7fUl8S3xqgsRjDGOtpGqn9pXgqZIGdwgCbP4uLFn3bjXGEJB2xD9JpzS1c9h';

verifyToken = (req, res, next) => {
  // const token = req.session.token;

  const headers = req.headers['authorization'];

  if (typeof headers !== 'undefined') {
    const token = headers.split(' ')[1];

    if (!token) return res.status(403).send({ message: 'No token provided!' });

    jwt.verify(token, JWT_SECRET,
      (err, decoded) => {
        if (err) return res.status(401).send({ message: 'Unauthorized' });
        req.userId = decoded.id;
        // req.session = { token };
        next();
      });
  } else {
    res.status(500).send({ message: 'No authorization included' });
    return;
  }
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) return;

    Role.find({
      _id: { $in: user.roles },
    }, (err, roles) => {
      if (err) return;

      if (roles.includes('admin')) {
        next();
        return;
      };

      res.status(403).send({ message: 'Require Admin Role!' });
      return;
    });
  });
};

isDeveloper = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) return;

    Role.find({
      _id: { $in: user.roles },
    }, (err, roles) => {
      if (err) return;

      if (roles.includes('developer')) {
        next();
        return;
      };

      res.status(403).send({ message: 'Require Developer Role' });
      return;
    });
  });
};

module.exports = { verifyToken, JWT_SECRET, isAdmin, isDeveloper };
