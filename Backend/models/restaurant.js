const mongoose = require('mongoose');
consst restaurantSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please enter restaurant name"],
        trim :true,
        maxLength:[100,"Restaurant name cannot exceed 100 characters"]
    }

    isVed:{
        type:Boolean,
        default:false
    }
})