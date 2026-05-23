const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const CheckConnections = require('./DB/database')
CheckConnections()

// ENV
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3005

// CORS FIX
app.use(cors())

// BODY PARSER
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// STATIC FOLDER
app.use('/uploads', express.static('Public/Uploads'))

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Welcome REST API")
})

// ROUTES
const fishrouter = require('./Router/fish.router')
app.use("/api/fish", fishrouter)

const chickenRouter = require('./Router/chicken.router')
app.use("/api/chicken", chickenRouter)

const muttonRouter = require('./Router/mutton.router')
app.use("/api/mutton", muttonRouter)

const riceRouter = require('./Router/rice.router')
app.use("/api/rice", riceRouter)

const sweetRouter = require('./Router/sweet.router')
app.use("/api/sweet", sweetRouter)

const userRouter = require('./Router/user.router')
app.use("/api/user", userRouter)

/* app.listen(port,host, () => {
    console.log(`Server hasbeen started at http://${host}:${port}`)
}) 
 */
module.exports=app



