const multer = require("multer")
const storage = multer.memoryStorage()


exports.upload = multer({
    storage,
    limits:{
        fileSize:5 * 1024 * 1024
    }
})


