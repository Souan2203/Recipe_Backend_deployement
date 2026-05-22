const express = require('express')
const foodRouter = express.Router();
const foodmodel = require('../Model/fishmodel')
const db = require('../DB/database')
const auth = require('../Middleware/auth')
const multer =require('multer')

const uploadStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./Public/Uploads/Fish')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+Math.floor(Math.random()*99999)+"-"+file.originalname)
    }
})

const uploadObj = multer({
    storage:uploadStorage
})

foodRouter.get("/all", async (req, res) => {
    try {
        let food = await foodmodel.find()
       // console.log(food);
        
        res.status(200).json(food)
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})

foodRouter.get("/get",auth ,async (req, res) => {
    try {
        let food = await foodmodel.find({userId:req.user.user_id})
       // console.log(food);
        if(!food){
            res.status(200).json({"message":"no items available"})
        }else{
        res.status(200).json(food)
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})

foodRouter.get("/show/:id", async (req, res) => {
    try {
        let foodobj = await foodmodel.findOne({ _id: req.params.id })
        if (!foodobj) {
            res.status(200).json({ "message": "No Food found" })
        } else {
            res.status(200).json(foodobj)
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
})
foodRouter.put("/update/:id",auth, async (req, res) => {
    try {
       let foodObj= await foodmodel.updateOne({ _id: req.params.id }, {
            $set:{
                foodname: req.body.foodname,
                ingredients: req.body.ingredients,
                fooddesc: req.body.fooddesc
            }
        })
        if(!foodObj){
            res.status(200).json({"message":"Unable to Update"})
        }else{
            res.status(200).json({"message":"Update Successfully"})
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})

foodRouter.post("/add",auth,uploadObj.single("fish") ,async (req, res) => {
    try {
        let foodobj = await foodmodel.insertOne({
            foodname: req.body.foodname,
            ingredients: req.body.ingredients,
            fooddesc: req.body.fooddesc,
            image:req.file.filename,
            userId:req.user.user_id
        })
        if (!foodobj) {
            res.status(200).json({ "message": "Unable to adda Food" })
        } else {
            res.status(200).json({ "message": "Food Added successfully" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})
foodRouter.delete("/delete/:id",auth,async(req,res)=>{
    try{
        let delObj= await foodmodel.deleteOne({_id:req.params.id})
        if(!delObj){
            res.status(200).json({"message":"Unable to delete"})
        }else{
            res.status(200).json({"message":"Delete Successfully"})
        }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})


module.exports = foodRouter;