const {body,validationResult} = require("express-validator")


exports.validateCategory = [
    body("name")
    .notEmpty()
    .toUpperCase()
    .withMessage("Invalid name"),


    async (req,res, next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                success:false,
                errors:errors.array
            })
        }
    next()
        
    }
]