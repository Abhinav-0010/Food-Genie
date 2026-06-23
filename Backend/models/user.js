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
            },
            Message: "Password does not match"
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
    },
    avatar:{
        public_id:String,
        url:String
    },
    passwordchangedAt:Date,
    passwordResetToken:String,
    passwordResetExpire:Date
},
    {timestamps:true}
)



// hash password
// pre("save")=> runs before data is saved to database

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
})

// Password compare method
// candidate password- original
// userpassword - hashed

userSchema.methods.correctpassword = async function(
    candidatePassword, userPassword
){
    return await bcrypt.compare(candidatePassword,userPassword)
}


//checks whether user password changed or not after token was issued, if password is changed then token will be invalid, login again

userSchema.methods.changePasswordAfter= function(JWTTimestamp){
    if(this.passwordchangedAt){
        const changedTimestamp=parseInt(
            this.passwordchangedAt.getTime()/1000,10
        )
        return JWTTimestamp < changedTimestamp
    }
    return false;
}

// Generate JWT token custom func

userSchema.methods.getJWTToken= function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES}
    )
}



module.exports = mongoose.model("User",userSchema)
