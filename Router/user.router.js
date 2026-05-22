const express = require('express')
const userRouter=express.Router();
const userModel = require('../Model/user.model')
const db=require('../DB/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config();

function genHashpass(input){
    const saltRounds = 10
    const hashed=bcrypt.hashSync(input,saltRounds)
    return hashed
}
userRouter.post("/signup",async(req,res)=>{
    try{
        let userObj= await userModel.insertOne({
            name:req.body.name,
            email:req.body.email,
            ph:req.body.ph,
            pass:genHashpass(req.body.pass)
        })
        if(!userObj){
            res.status(200).json({"message":"unable to signup"})
        }else{
            res.status(200).json({"message":"signup successfully"})
        }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})
userRouter.post("/signin",async(req,res)=>{
    try{
       let user= await userModel.findOne({email:req.body.email})
        console.log(user);
       // res.status(200).json(user)
        const dbpass = user.pass
        console.log(dbpass);
        
        const Password=req.body.pass
        console.log(Password);
        const isvalid = bcrypt.compareSync(Password,dbpass)?true:false;
        console.log(isvalid);
        if(isvalid){
            const token = jwt.sign({"user_id":user._id},process.env.JWT_SECRET,{expiresIn:'60m'})
            console.log(token);
            
            res.status(200).json({"message":"login successfully",user:user,token})
        }else{
            
            res.status(200).json({"message":"login error"})
        } 
        
    }catch(error){
        console.log(error);
        res.status(401).json(error)
        
    }
})
module.exports=userRouter