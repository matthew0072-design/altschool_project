const http = require('http')
const app = require('./app')
const { PORT } = require('./config/config')

const port = PORT || 5000

const server = http.createServer(app)
server.listen(port, () => console.log(`Running in ${process.env.NODE_ENV} mode on port ${port}`))