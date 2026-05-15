import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/temp");
  },
  filename: (req, file, cb) => {
    const randomString = Math.random().toString(36).substring(2, 10);
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = randomString + fileExtension;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });
