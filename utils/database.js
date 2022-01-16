const mysql = require('mysql2/promise')
const helpers = require('./helpers')

const configuration = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
    connectTimeout: 30000,
    dateStrings: true,
}

async function query(sql, params = []) {
    try {
        const conn = await mysql.createConnection(configuration)
        const [rows, fields] = await conn.execute(sql, params)
        conn.end()
        return rows
    } catch (ex) {
        helpers.log(`Query exx: ${ex}`)
        return []
    }
}

module.exports = {
    query,
}
