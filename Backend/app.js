// config express and middleware

// import packages
// create express app
//          client => app => route => response
// configure middleware
// export app   

const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())

module.exports=app