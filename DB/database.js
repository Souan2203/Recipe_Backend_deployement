const mongoose = require('mongoose')
require('dotenv').config()

async function CheckConnections() {

    try {

        await mongoose.connect(process.env.MONGO_URI)

        console.log("Database successfully connected")

    } catch (error) {

        console.log(error)

    }

}

module.exports = CheckConnections