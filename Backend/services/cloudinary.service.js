import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  // Configure here so env vars are always read at call time, not import time
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "Users",
      unique_filename: true,
    });
    console.log("Uploaded successfully:", response.url);
    fs.unlinkSync(localFilePath); // clean up local file after successful upload
    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };
