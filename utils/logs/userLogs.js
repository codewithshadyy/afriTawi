
const fs = require('fs')
const path = require("path")

exports.accessLogStream = fs.createReadStream(
    path.join("access.log"),
    {flags:"a"}
)