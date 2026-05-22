
const {body, validationResult} = require("express-validator")

exports.validateCounty  = [
    body("name")
    .toUpperCase()
    .notEmpty()
    .withMessage("County exists"),


    body("code")
    .toInt()
    .notEmpty()
    .withMessage("Invalid code"),

     (req,res,next) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(200).json({
                success: false,
                errors: errors.array()
            })
        }

        next()

    }

    

]