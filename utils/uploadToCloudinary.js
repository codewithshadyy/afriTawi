
const cloudinary =require("./cloudinary")

const streamifier = require('streamifier')

exports.uploadToCloudinary = (fileBuffer)=>{

  

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder:"profiles"
            },
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            }
        )


        streamifier
        .createReadStream(fileBuffer)
        .pipe(stream)
    })
}