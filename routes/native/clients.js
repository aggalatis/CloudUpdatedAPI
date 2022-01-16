const express = require('express')
const _ = require('underscore')
const router = express.Router()
const db = require('../../utils/database')
const helpers = require('../../utils/helpers')
const auth = require('../../utils/authorization')

router.post('/authenticate', async (req, res) => {
    const user = req.body
    const users = await db.query('SELECT * FROM native_clients WHERE username = ? AND password = ? LIMIT 1', [
        user.username,
        helpers.hashPass(user.password),
    ])
    if (users.length == 0) {
    }
    if (_.isEmpty(users)) {
        res.send({
            message: 'Authentication Failed',
            user: null,
            token: null,
        })
        return
    }
    const token = auth.createToken(users[0])
    db.query('UPDATE native_clients SET last_login = now() WHERE id = ?', [users[0].id])
    res.send({
        message: 'Authentication Passed',
        user: _.omit(users[0], 'password'),
        token: token,
    })
})

module.exports = router
