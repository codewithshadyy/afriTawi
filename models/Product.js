const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Product = sequelize.define("Product", {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

    image_url: {
        type: DataTypes.TEXT
    },


    image_public_id:{
   type:DataTypes.STRING
}

    ,

    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

})

module.exports = Product