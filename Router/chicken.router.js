const express = require('express')
const chickenRouter =express.Router();
const db=require('../DB/database')
const cickenmodel=require('../Model/chickenmodel');
const chickenmodel = require('../Model/chickenmodel');
const auth = require('../Middleware/auth');
const muttonmodel = require('../Model/muttonmodel');
const multer = require('multer')

const uploadStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./Public/Uploads/ChickenUploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+ Math.floor(Math.random()*99999)+"-"+file.originalname)
    }
})

const uploadObj = multer({
    storage:uploadStorage
})

chickenRouter.get("/all",async(req,res)=>{
    try{
       let chickenObj= await chickenmodel.find()
       res.status(200).json(chickenObj)
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})

chickenRouter.get("/get",auth,async(req,res)=>{
    try{
       let chickenObj= await chickenmodel.find({userId:req.user.user_id})
       if(!chickenObj){
        res.status(200).json({"message":"no items available"})
       }else{
        res.status(200).json(chickenObj)
       }
       
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})

chickenRouter.get("/show/:id",auth,async(req,res)=>{
    try{
       let chicken= await chickenmodel.findOne({_id:req.params.id})
       if(!chicken){
        res.status(200).json({"message":"Unable to find"})
       }else{
        res.status(200).json(chicken)
       }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})

chickenRouter.post("/add",auth,uploadObj.single("chicken"),async (req,res)=>{
    try{
       let chickenObj= await chickenmodel.insertOne({
            foodname:req.body.foodname,
            ingredients:req.body.ingredients,
            fooddesc:req.body.fooddesc,
            image:req.file.filename,
            userId:req.user.user_id
        })
        if(!chickenObj){
            res.status(200).json({"message":"Unable to add"})
        }else{
            res.status(200).json({"message":"Added Successfully"})
        }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})
chickenRouter.put("/update/:id",auth,async(req,res)=>{
    try{
        let chickenObj= await chickenmodel.updateOne({_id:req.params.id},{$set:{
            foodname:req.bodyfoodname,
            ingredients:req.body.ingredients,
            fooddesc:req.body.fooddesc
        }})
        if(!chickenObj){
            res.status(200).json({"message":"Unable to update"})
        }else{
            res.status(200).json({"message":"Update Successfully"})
        }
    }catch(error){
        console.log(error);
        
        res.status(401).json(error)
    }
})
chickenRouter.delete("/delete/:id",auth,async(req,res)=>{
    try{
       let delObj= await chickenmodel.deleteOne({_id:req.params.id})
       if(!delObj){
        res.status(200).json({"message":"Unable to delte"})
       }else{
        res.status(200).json({"message":"Deleted Successfully"})
       }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})

module.exports=chickenRouter