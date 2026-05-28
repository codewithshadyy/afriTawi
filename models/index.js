
const User = require("./User")
const Profile = require("./Profile")
const Product = require("./Product")
const Category = require("./Category")
const County = require("./County")
const AuditLog = require("./AuditLog")



// user - profile relationship
User.hasOne(Profile, {
    foreignKey:"user_id",
    onDelete:"CASCADE"
})
Profile.belongsTo(User, {
    foreignKey:"user_id"
})

// county - profile relationship

County.hasMany(Profile, {
    foreignKey:"county_id",
    onDelete:"CASCADE"
})

Profile.belongsTo(County, {
    foreignKey:"county_id"
})


// user - product relatipnship
User.hasMany(Product, {
     foreignKey:"user_id",
    onDelete:"CASCADE"

})
Product.belongsTo(User, {
    foreignKey:"user_id",

})



// Product-Category
Category.hasMany(Product, {
    foreignKey: "category_id"
})

Product.belongsTo(Category, {
    foreignKey: "category_id"
})


User.hasMany(AuditLog, {
    foreignKey:"user_id",
    onDelete:"CASCADE"
})


AuditLog.belongsTo(User, {
    foreignKey:"user_id"
})


module.exports = {
    User,
    Profile,
    Product,
    Category,
    County
}






