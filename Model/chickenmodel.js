const mongoose = require('mongoose')

const chickenSchema = mongoose.Schema({
    foodname:{
        type:String,
        required:[true,"Foodname is required"]
    },

    ingredients:{
        type:String,
        required:[true,"Ingredients is required"]
    },

    fooddesc:{
        type:String,
        required:[true,"Description is required"]
    },

    image:{
        type:String,
        required:true
    },

    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:true
    },

},{timestamps:true, versionKey:false})

module.exports = mongoose.model("chickenmodel", chickenSchema, "Chicken")