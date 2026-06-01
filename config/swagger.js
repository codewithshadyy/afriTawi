const swaggerJsDoc = require("swagger-jsdoc")

const options = {

    definition: {
        openapi: "3.0.0",

        info: {
            title: "AfriTawi API",
            version: "1.0.0",
            description: "Marketplace API for Kenyan creatives"
        },

        servers: [
            {
                url: "http://localhost:4545"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ["./routes/*.js"]
}

const swaggerSpec = swaggerJsDoc(options)

module.exports = swaggerSpec