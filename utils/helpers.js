const crypto = require('crypto')
const moment = require('moment')

function hashPass(pass) {
    return crypto.createHash('sha256').update(pass).digest('hex')
}

function getDateTimeNow() {
    return moment().format('DD/MM/YYYY HH:mm:ss')
}

module.exports = {
    hashPass,
    getDateTimeNow,
}
