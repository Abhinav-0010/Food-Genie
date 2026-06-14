const mongoose = require ("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then((con)=>{
        console.log(`Mongodb Connected with Host: ${con.connection.host}`)
    })
}

module.exports= connectDatabase