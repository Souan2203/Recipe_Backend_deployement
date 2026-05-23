const express = require('express')
const muttonRouter = express.Router()
const db = require('../DB/database')
const muttonModel=require('../Model/muttonmodel')
const auth = require('../Middleware/auth')
const multer =require('multer')

const uploadStorage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./Public/Uploads/mutton')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+Math.floor(Math.random()*99999)+"-"+file.originalname)
    }

})

const uploadObj=multer({
    storage:uploadStorage
})

muttonRouter.post("/add",auth,uploadObj.single("mutton"),async(req,res)=>{
    try{
      let muttonObj=  await muttonModel.insertOne({
            foodname:req.body.foodname,
            ingredients:req.body.ingredients,
            fooddesc:req.body.fooddesc,
            /* image:req.file.filename, */
            userId:req.user.user_id
        })

        if(!muttonObj){
            res.status(200).json({"message":"Unable to add"})
        }else{
            res.status(200).json({"message":"Added Successfully"})
        }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})
muttonRouter.get("/all", async (req, res) => {
    try {
        let muttonObj = await muttonModel.find()
        res.status(200).json(muttonObj)
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})

muttonRouter.get("/get", auth,async (req, res) => {
    try {
        let muttonObj = await muttonModel.find({userId:req.user.user_id})
        if(!muttonObj){
            res.status(200).json({"message":"no items available"})
        }else{
        res.status(200).json(muttonObj)
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)

    }
})
muttonRouter.get("/show/:id",auth,async(req,res)=>{
    try{
       let mutton= await muttonModel.findOne({_id:req.params.id})
       if(!mutton){
        res.status(200).json({"message":"Unable to find"})
       }else{
        res.status(200).json(mutton)
       }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})

muttonRouter.put("/update/:id",auth,async(req,res)=>{
    try{
        let muttonObj= await muttonModel.updateOne({_id:req.params.id},{$set:{
            foodname:req.body.foodname,
            ingredients:req.body.ingredients,
            fooddesc:req.body.fooddesc
        }})
        if(!muttonObj){
            res.status(200).json({"message":"unable to update"})
        }else{
            res.status(200).json({"message":"Update Successfully"})
        }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})
muttonRouter.delete("/delete/:id",auth,async(req,res)=>{
    try{
        let delObj= await muttonModel.deleteOne({_id:req.params.id})
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


module.exports=muttonRouter;