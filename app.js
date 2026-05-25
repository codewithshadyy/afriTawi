const express = require("express")
const pool  = require("./config/db")
const app = express()
const sequelize = require("./config/db")
const models = require("./models/index")
const UserRoutes = require("./routes/authRoutes")
const countyRoutes = require("./routes/countyRoutes")
const categoryRoutes = require("./routes/categoryRoutes")

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

    app.use("/api/v1/auth", UserRoutes)
    app.use("/api/v1/county", countyRoutes)
    app.use("/api/v1/caregories")




app.listen(process.env.PORT, () => {
    console.log(`server running on:http://localhost:${process.env.PORT}`)
})
