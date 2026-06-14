// Schema

const mongoose = require("mongoose")

const validator = require("validator")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")

// Creating UserSchema 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Enter valid email address"]
    },
    password:{
        type:String,
        required:[true,"Enter your password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false   //  password will not be fetched while fetching user data from database
    },
    passwordConfirm:{
        type:String,
        required:[true,"Confirm your password"],
        validate:{
            validator : function(el){
                return el === this.password
            }
            message: "Password does not match"
        }
    },
    phoneNumber:{
        type:Number,
        required:[true,"Please enter your phone number"],
        match:[/^[0-9]{10}$/,"Enter valid phone number"]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }


})