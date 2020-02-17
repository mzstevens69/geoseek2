const express = require('express')
const cors = require('cors')
const server = express()
const helmet = require('helmet')


server.use(express.json())
server.use(cors())
server.use(helmet())

server.get('/',(req,res)=>{
    res.send('Server Running')
})


module.exports = server