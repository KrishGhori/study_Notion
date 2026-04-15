const cloudinary = require('cloudinary').v2

exports.uploadImageToCloudinary = async (file , folder , height , quality) => {
    if(!file || !file.tempFilePath){
        throw new Error("File upload data is missing tempFilePath")
    }

    const option = {folder}
    if(height){
        option.height = height
    }
    if(quality){
        option.quality = quality
    }
    option.resource_type = "auto"

    return await cloudinary.uploader.upload(file.tempFilePath , option)
}