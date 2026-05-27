const { body, validationResult } = require("express-validator")

exports.validateProduct = [

    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name should not be empty"),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),

    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isDecimal()
      .withMessage("Price must be a decimal number")
      .custom(value => {

          if (parseFloat(value) <= 0) {
              throw new Error("Price must be greater than 0")
          }

          return true
      }),

    body("stock")
      .notEmpty()
      .withMessage("Stock is required")
      .isInt({ min: 0 })
      .withMessage("Stock must be a valid integer")
      .toInt(),

    (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return res.status(400).json({
                success: false,
                errors: errors.array()
            })

        }

        next()
    }

]