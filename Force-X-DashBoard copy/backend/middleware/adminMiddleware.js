const adminMiddleware = (req, res, next) => {
  const user = req.user;
  
  if (user.role !== 'itadmin') {
    return res.status(403).json({ message: 'Access denied. IT Admin role required.' });
  }
  next();
};

module.exports = adminMiddleware;