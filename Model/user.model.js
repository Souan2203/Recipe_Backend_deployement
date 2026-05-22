const mongoose=require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    ph:{
        type:String,
        required:[true,"Phone number is required"]
    },
    pass:{
        type:String,
        required:[true,"Password is required"]
    }
},{timestamps:true, versionKey:false})
module.exports= mongoose.model("userModel",userSchema,"User")