const jwt = require('jsonwebtoken')
const env = require ('dotenv').config()

const checkAuth=(req,res,next)=>{
    try{
        const authHeaders=req.headers['authorization']
        const token = authHeaders.split(" ")[1]
        if(!token){
            res.status(200).json({"message":"Token is not privide"})
        }else{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user=decode
            next()
        }
    }catch(error){
        res.status(401).json(error)
    }
}
module.exports=checkAuth;