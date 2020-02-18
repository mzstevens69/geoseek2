const express = require('express')
const cors = require('cors')
const server = express()
const helmet = require('helmet')

const usersRouter = require('./users/users-router')

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/api/users', usersRouter)

server.get('/',(req,res)=>{
    res.send('Server Running')
})


module.exports = server