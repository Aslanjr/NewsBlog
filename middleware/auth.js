const User = require('../models/Users.js');
const JWT_KEY = 'WinterIsComingGOT2020';
const jwt  = require('jsonwebtoken');


const auth = async(req, res, next) => {
    const authToken = req.cookies['access_token'];
    const data = jwt.verify(authToken, JWT_KEY);
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': authToken })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = authToken
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' }).redirect('/Auth/Login')
    }
    
    next();
}

module.exports = auth