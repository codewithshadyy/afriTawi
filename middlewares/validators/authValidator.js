const {body, validationResult} = require("express-validator")

exports.validateSignUp = [
    body("email")
    .isEmail()
    .withMessage("A valid email is required"),



    body("username")
    .notEmpty()
    .withMessage("Email required")
    .isLength({min:3})
    .withMessage("Username must be atleast 3 letters"),


    body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
    

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


exports.validatePasswordReset = [

    body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

    async (req,res,next) => {

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

