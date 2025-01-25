import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name:process.env.CLOUINARY_CLOUD_NAME,
    api_key:process.env.CLOUINARY_API_KEY,
    api_secret:process.env.CLOUINARY_API_SECRET
})

export default cloudinary;