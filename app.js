const express = require("express")
const pool  = require("./config/db")
const app = express()
const sequelize = require("./config/db")
const models = require("./models/index")

// routes
const UserRoutes = require("./routes/auth")
const countyRoutes = require("./routes/county")
const categoryRoutes = require("./routes/category")
const profileRoutes = require("./routes/profiles")
const productRoutes = require("./routes/products")
const logsRoutes = require("./routes/logs")
const sellerRoutes = require("./routes/users")



// security packages

const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")



const dotenv = require("dotenv")


dotenv.config()


// utils

const {accessLogStream} = require("./utils/logs/userLogs")



// morgan
app.use(morgan("combined",{
    stream:accessLogStream
}))

// helmet

app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"],
        scriptSrc:["'self'", "'trusted-cdn.com'"]
    }
}
))






// documentation


const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")




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
