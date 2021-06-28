const jwt = require('jsonwebtoken');
const config = require('config');
const key = require('../utils/key');




function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.redirect('/sign-in');
    } else {
        try {
            const decoded = jwt.verify(token, key);
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(400).send('Yaroqsiz token');
        }
    }
}





module.exports = auth;

















