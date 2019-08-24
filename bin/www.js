const http = require('http')

const PORT = 8000
const serverHandle = require('../App')

const server = http.createServer(serverHandle)

server.listen(PORT)