const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const isOwner = (req, res, next) => {
  if (req.user.userType !== 'owner') {
    return res.status(403).json({ message: 'Access denied. Owner privileges required.' });
  }
  next();
};

const isBuyer = (req, res, next) => {
  if (req.user.userType !== 'buyer') {
    return res.status(403).json({ message: 'Access denied. Buyer privileges required.' });
  }
  next();
};

module.exports = { auth, isOwner, isBuyer };
