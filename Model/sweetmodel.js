const mongoose = require('mongoose')

const sweetSchema = mongoose.Schema({
    foodname: {
        type: String,
        required: [true, "Food name is required"]
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
        required:true,
    }, */
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: true
    }
}, {timestamps:true, versionKey: false })

module.exports = mongoose.model("sweetschema", sweetSchema, "Sweet")