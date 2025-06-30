const JWT = require('jsonwebtoken');

// Checks token and sets req.user
exports.protect = (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = auth.split(' ')[1];  // Extract the token from the header  {Bearer <token>}
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

// Checks role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};