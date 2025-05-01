const jwt = require('../helpers/jwt'); 

const authMiddleware = (req, res, next) => {
  try {
    
    const decoded = jwt.verify(req);
    
    
    req.user = decoded;

    next(); 
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(401).json({ message: 'Unauthorized: ' + error.message });
  }
};

module.exports = authMiddleware;