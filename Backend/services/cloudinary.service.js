import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      public_id: "",
      folder: "Users",
      // it remove the extension from the file name
      unique_filename: true,
      allowed_formats: ["jpg", "jpeg", "png", "gif"],
    });
    console.log("uploaded successfully ", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the file from the server if it fails to upload
    return null;
  }
};

export { uploadOnCloudinary };
