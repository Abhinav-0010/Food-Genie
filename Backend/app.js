// config express and middleware

// import packages
// create express app
//          client => app => route => response
// configure middleware
// export app   

const express = require('express')
const app = express()

const auth= require('./routes/auth')

const cors = require('cors')

app.use(cors())
app.use(express.json())


//common route to all
app.use('/api/v1/users',auth)   // all routes in auth.js will be prefixed with /api/v1


module.exports=app