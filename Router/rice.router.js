const express = require('express')
const riceRouter = express.Router();
const riceModel = require('../Model/ricemodel')
const db = require('../DB/database')
const auth = require('../Middleware/auth')
const multer = require('multer')

const uploadStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,("./Public/Uploads/rice"))
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+Math.floor(Math.random()*99999)+"-"+file.originalname)
    }
})

const uploadObj =multer({
    storage:uploadStorage
})
riceRouter.post("/add",auth,uploadObj.single("rice") ,async (req, res) => {
    try {
        let riceObj = await riceModel.insertOne({
            foodname: req.body.foodname,
            ingredients: req.body.ingredients,
            fooddesc: req.body.fooddesc,
            image:req.file.filename,
            userId:req.user.user_id
        })
        if (!riceObj) {
            res.status(200).json({ "message": "Unable to add" })
        } else {
            res.status(200).json({ "message": "Added Successfully" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})

riceRouter.get("/get",auth ,async (req, res) => {
    try {
        let riceObj = await riceModel.find({userId:req.user.user_id})
        if(!riceObj){
            res.status(200).json({"message":"no items available"})
        }else{
        res.status(200).json(riceObj)
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})

riceRouter.get("/all", async (req, res) => {
    try {
        let riceObj = await riceModel.find()
        res.status(200).json(riceObj)
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})
riceRouter.get("/show/:id",auth,async(req,res)=>{
    try{
       let rice= await riceModel.findOne({_id:req.params.id})
       if(!rice){
        res.status(200).json({"message":"Unable to find"})
       }else{
        res.status(200).json(rice)
       }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})

riceRouter.put("/update/:id",auth,async(req,res)=>{
    try{
       let riceObj= await riceModel.updateOne({_id:req.params.id},{$set:{
            foodname:req.body.foodname,
            ingredients:req.body.ingredients,
            fooddesc:req.body.fooddesc
        }})
        if(!riceObj){
            res.status(200).json({"message":"unable to update"})
        }else{
            res.status(200).json({"message":"Update Successfully"})
        }

    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})
riceRouter.delete("/delete/:id",auth,async(req,res)=>{
    try{
        let delObj= await riceModel.deleteOne({_id:req.params.id})
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
module.exports = riceRouter