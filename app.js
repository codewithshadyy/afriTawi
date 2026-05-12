const express = require("express")
const pool  = require("./config/db")
const app = express()
const sequelize = require("./config/db")
const models = require("./models/index")


const dotenv = require("dotenv")

dotenv.config()


app.use(express.json())


sequelize.sync({alter:true})
.then(() => {
    console.log("Database connected")
     
})

.catch((err) => {
        console.log(err)
    })




app.listen(process.env.PORT, () => {
    console.log(`server running on:http://localhost:${process.env.PORT}`)
})
