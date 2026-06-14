// start the server


const app = require("./app")
const connectDatabase = require("./config/database")
const dotenv = require('dotenv')

//load enviornment variables
dotenv.config({path:'./config/config.env'})

//connect to database
connectDatabase()

// start the server

PORT= process.env.PORT

/* Can also use the below code to start the server 

app.listen(PORT,() =>{
console.log(`Server started on port ; ${PORT}`)
})          
*/

app.listen(process.env.PORT,() =>{
console.log(`Server started on port ; ${process.env.PORT}`)
})