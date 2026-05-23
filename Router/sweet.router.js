const express = require('express')
const sweetRouter = express.Router();
const sweetModel = require('../Model/sweetmodel')
const db = require('../DB/database')
const auth=require('../Middleware/auth')
const multer =require('multer')

const uploadStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./Public/Uploads/sweet")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+Math.floor(Math.random()*99999)+"-"+file.filename)
    }
})

const uploadObj = multer({
    storage:uploadStorage
})
sweetRouter.post("/add",auth,uploadObj.single("sweet"),async (req, res) => {
    try {
        let sweetObj = await sweetModel.insertOne({
            foodname: req.body.foodname,
            ingredients: req.body.ingredients,
            fooddesc: req.body.fooddesc,
            /* image:req.file.filename, */
            userId:req.user.user_id
        })
        if (!sweetObj) {
            res.status(200).json({ "message": "Unable to add" })
        } else {
            res.status(200).json({ "message": "Added Successfully" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})

sweetRouter.get("/get",auth ,async (req, res) => {
    try {
        let sweetObj = await sweetModel.find({userId:req.user.user_id})
        if(!sweetObj){
            res.status(200).json({"message":"no items available "})
        }else{
            res.status(200).json(sweetObj)
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})

sweetRouter.get("/all", async (req, res) => {
    try {
        let sweetObj = await sweetModel.find()
        res.status(200).json(sweetObj)
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})

sweetRouter.get("/show/:id",auth,async(req,res)=>{
    try{
       let sweet= await sweetModel.findOne({_id:req.params.id})
       if(!sweet){
        res.status(200).json({"message":"Unable to find"})
       }else{
        res.status(200).json(sweet)
       }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})
sweetRouter.put("/update/:id",auth,async(req,res)=>{
    try{
       let sweetObj= await sweetModel.updateOne({_id:req.params.id},{$set:{
            foodname:req.body.foodname,
            ingredients:req.body.ingredients,
            fooddesc:req.body.fooddesc
        }})
        if(!sweetObj){
            res.status(200).json({"message":"unable to update"})
        }else{
            res.status(200).json({"message":"Update Successfully"})
        }

    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})
sweetRouter.delete("/delete/:id",auth,async(req,res)=>{
    try{
        let delObj= await sweetModel.deleteOne({_id:req.params.id})
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
module.exports = sweetRouter