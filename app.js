const express = require("express")
const pool  = require("./config/db")
const app = express()
const sequelize = require("./config/db")
const models = require("./models/index")
const UserRoutes = require("./routes/auth")
const countyRoutes = require("./routes/county")
const categoryRoutes = require("./routes/category")
const profileRoutes = require("./routes/profiles")
const productRoutes = require("./routes/products")
const logsRoutes = require("./routes/logs")
const sellerRoutes = require("./routes/users")


// documentation


const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")



const dotenv = require("dotenv")

dotenv.config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


sequelize.sync({alter:true})
.then(() => {
    console.log("Database connected")
     
})

.catch((err) => {
        console.log(err)
    })

    app.use("/api/v1/auth", UserRoutes)
    app.use("/api/v1/county", countyRoutes)
    app.use("/api/v1/categories", categoryRoutes)
    app.use("/api/v1/profiles", profileRoutes)
    app.use("/api/v1/products", productRoutes)
    app.use("/api/v1/logs", logsRoutes)
    app.use("/api/v1/portfolio", sellerRoutes)


    app.use(
    "/api/v1/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)




app.listen(process.env.PORT, () => {
    console.log(`server running on:http://localhost:${process.env.PORT}`)
})
