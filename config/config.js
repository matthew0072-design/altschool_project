require('dotenv').config()

const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
const DB_CONNECT = process.env.DB_CONNECT

module.exports = {
    PORT,
    JWT_SECRET,
    DB_CONNECT
} 