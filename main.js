const express = require('express')
const cors =require('cors')
const env = require('dotenv').config();

const host = process.env.HOST
const port =process.env.port

const app =express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
/* app.use("/",(req,res)=>{
    res.send("Welcome REST API")
})
 */
app.use('/uploads', express.static('Public/Uploads'))
const fishrouter = require('./Router/fish.router')
app.use("/api/fish",fishrouter)
const chickenRouter = require('./Router/chicken.router')

app.use("/api/chicken",chickenRouter)

const muttonRouter = require('./Router/mutton.router')
app.use("/api/mutton",muttonRouter)
const riceRouter = require('./Router/rice.router')
app.use("/api/rice",riceRouter)

const sweetRouter = require('./Router/sweet.router')
app.use("/api/sweet",sweetRouter)

const userRouter = require('./Router/user.router')
app.use("/api/user",userRouter)

app.listen(port,host,()=>{
    console.log(`server has started at http://${host}:${port}`);
    
})