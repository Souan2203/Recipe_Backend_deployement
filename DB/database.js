const mongoose = require ('mongoose')
const env = require('dotenv').config();

const dbUrl = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/banglarkhaddo`

async function CheckConnections() {
    try{
       await mongoose.connect(dbUrl);
       console.log("Database successfully connected");
       
    }catch(error){
        console.log(error);
        
    }
}
module.exports=CheckConnections();
console.log("Database is globally Connected");
