require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helpers = require('./utils/helpers')
const nativeClients = require('./routes/native/clients')

let app = express()
app.use(express.json())

app.use(
    morgan(function (tokens, req, res) {
        return [
            helpers.getDateTimeNow() + ' -->',
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
        ].join(' ')
    })
)
app.use(express.urlencoded({ extended: true }))
app.use('/nativeapi/clients', nativeClients)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})

app.get('/', (req, res) => {
    res.json({
        message: 'CloudUpdate API',
    })
})
