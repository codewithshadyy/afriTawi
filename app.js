const express = require("express")
const pool  = require("./config/db")
const app = express()


const dotenv = require("dotenv")

dotenv.config()


app.use(express.json())

pool.connect((err, client, release)=>{
    if(err){

        console.error("couldn't connect to the database", err.stack)

        return
       
    } 

    console.log("Database connected successfully")
    release()

    
    
})





app.listen(process.env.PORT, () => {
    console.log(`server running on:http://localhost:${process.env.PORT}`)
})
