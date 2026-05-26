
const cloudinary =require("./cloudinary")

const streamifier = require('streamifier')

exports.uploadToCloudinary = (fileBuffer)=>{

  

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder:"images"
            },
            (error, result)=>{
                if(result){
                    resolve(result)
                }

                if(error){
                    reject(error)
                }
            }
        )


        streamifier
        .createReadStream(fileBuffer)
        .pipe
    })
}