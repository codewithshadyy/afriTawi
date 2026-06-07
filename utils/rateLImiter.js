const expressRateLimit = require("express-rate-limit")

exports.limiter = expressRateLimit({
    windowMs:1000 * 60 * 60 * 15,
    max:5,
    message:{
        success:false,
        messsage:"Too many invalid logins try again after 15 mins"
    },
    standardHeaders:true,
    legacyHeaders:false


})