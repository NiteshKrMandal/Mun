import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// AWS S3Client instance
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer middleware using S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    // 🚫 Remove this line
    // acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = `uploads/${Date.now().toString()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file || !req.file.location) {
      return res
        .status(400)
        .json({ success: false, message: "Image upload failed" });
    }

    res.status(200).json({
      success: true,
      imageUrl: req.file.location,
    });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ success: false, message: "Error uploading image" });
  }
});

export default router;
