const jwt = require('jsonwebtoken');
const config = require('config');
const key = process.env.JWTPRIVATEKEY;


function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.json({success: false});
    } else {
        try {
            const decoded = jwt.verify(token, key);
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(400).send('invalid token');
        }
    }
}





module.exports = auth;

















