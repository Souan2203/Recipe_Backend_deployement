const mongoose = require('mongoose')

const muttonSchema = mongoose.Schema({
    foodname: {
        type: String,
        required: [true, "Foodname is required"]
    },
    ingredients: {
        type: String,
        required: [true, "ingredients is required"]
    },
    fooddesc: {
        type: String,
        required: [true, "fooddesc is required"]
    },
    /* image:{
        type:String,
        required:true
    }, */
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: true
    }
}, {timestamps:true ,versionKey: false })

module.exports = mongoose.model("MuttonModel", muttonSchema, "Mutton")