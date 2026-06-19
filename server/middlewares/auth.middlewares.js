const jwt = require("jsonwebtoken")

function verifyToken (req, res, next) {

    try {
        const authToken = req.headers.authorization.split(' ')[1]
        const payload = jwt.verify(authToken, process.env.TOKEN_SECRET)
        req.payload = payload
        next()
        
    } catch (error) {
        res.status(401).json({errorMessage:"Token invalid or doesn't exist"})
    }

}

module.exports = {
    verifyToken
}