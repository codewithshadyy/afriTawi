const {body, validationResult} = require("express-validator")

exports.validateProduct = [

    body("name")
    .notEmpty()
    .toString()
    .withMessage("Name should not be Empty"),


    

    body("description")
    .notEmpty()
    .toString()
    .withMessage("Invalid description"),

    body("stock")
    .toInt()
    .notEmpty()
    .withMessage("Invalid Stock input"),

    (req,res, next) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){

            return res.status(200).json({
                success:false,
                message:errors.array()
            })

        }

        next()
    }
    





]