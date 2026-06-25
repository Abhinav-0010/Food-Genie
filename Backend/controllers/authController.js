// import req packages, files

const User = require('../models/user')
const errorhandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/sendToken.js')
const Cloudinary = require('../config/cloudinary')


//Signup a user => 

exports.signup= catchAsyncErrors(async (req, res, next) => {
    const{name,email,password,passwordConfirm,phoneNumber}=req.body;

    let avatar=[]
    //avatar not provided
    if(!req.body.avatar || req.body.avatar === "/images/images.png"){
        avatar = {
            public_id: "default",
            url:"/images/images.png"
        }
    }
    else{
        const result= await Cloudinary.uploadStream(req.body.avatar,{
            folder:"avatar",
            width:150,
            crop:"scale"
        })
        avatar = {
            public_id: result.public_id,
            url: result.url
        }
    }
    
    const user = await User.create({
        name, email, password, passwordConfirm, phoneNumber, avatar
    })

    sendToken(user,200,res)
})


// login route => /api/v1/users/login

exports.login = catchAsyncErrors(async (req,res,next) => {


    const {email,password} = req.body;
    if(!email || !password){
        return next(new errorhandler("Please enter email and password",400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new errorhandler("Invalid email or password",401))
    }

    const isPasswordMatched = await user.correctpassword(password,user.password)

    if(!isPasswordMatched){
        return next(new errorhandler("Invalid email or password",401))
    }
    
    sendToken(user,200,res)
})