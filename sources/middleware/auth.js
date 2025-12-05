const jwt = require('jsonwebtoken');
const Auth = require('../models/authModel');

const requireAuth = async (req, res, next) => {
    // verify auth
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).json({
            error: 'authorization token required'
        });
    }
    // split jwt token
    const token = authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.TOKEN);
        const user = await Auth.findOne({ id }).select('id username');
        if(!user) {
            return res.status(401).json({
                error: 'user not found'
            });
        }
        req.user = user;
        req.isUser = true;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

module.exports = requireAuth;