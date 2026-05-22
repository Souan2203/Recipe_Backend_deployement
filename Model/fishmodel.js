const mongoose = require('mongoose')

const fishSchema = mongoose.Schema({
    foodname:{
        type:String,
        required:[true,"Food name is required"]
    },
    ingredients:{
        type:String,
        required:[true,"Ingridentes is required"]
    },
    fooddesc:{
        type:String,
        required:[true,"Food description is required"]
    },
    image:{
        type:String,
        required:true
    },
    userId :{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:true
    }
},{timestamps:true ,versionKey:false})
module.exports= mongoose.model("fishmodel",fishSchema,"Fish")