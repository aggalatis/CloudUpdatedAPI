const jwt = require('jsonwebtoken')

function createToken(data) {
    jwt.sign({ authData: data }, 'cloudUpdaterSecret', { expiresIn: 60 * 60 * 24 * 7 })
}

function verifyToken(token, res) {
    jwt.verify(token, 'cloudUpdaterSecret', (err, decoded) => {
        if (err) {
            res.sendStatus(401)
            return null
        }
        return decoded
    })
}

module.exports = {
    createToken,
    verifyToken,
}
