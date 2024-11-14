const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (role) => (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (role && req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
