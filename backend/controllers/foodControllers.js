// // import foodModel from "../models/foodModel.js";
// // import fs from "fs";

// // // add food item

// // const addFood = async (req, res) => {
// //   let image_filename = `${req.file.filename}`;

// //   const food = new foodModel({
// //     name: req.body.name,
// //     description: req.body.description,
// //     price: req.body.price,
// //     category: req.body.category,
// //     image: image_filename,
// //   });
// //   try {
// //     await food.save();
// //     res.json({ success: true, message: "Food Added" });
// //   } catch (error) {
// //     console.log(error);
// //     res.jso({ success: false, message: "Error" });
// //   }
// // };

// // // all food list
// // const listFood = async (req, res) => {
// //   try {
// //     const foods = await foodModel.find({});
// //     res.json({ success: true, data: foods });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // // Remove food item

// // const removeFood = async (req, res) => {
// //   try {
// //     const food = await foodModel.findById(req.body.id);
// //     fs.unlink(`uploads/${food.image}`, () => {});

// //     await foodModel.findByIdAndDelete(req.body.id);
// //     res.json({ success: true, message: "Food removed" });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // export { addFood, listFood, removeFood };

// // AWS S3
// import foodModel from "../models/foodModel.js";
// import AWS from "aws-sdk";
// import dotenv from "dotenv";
// dotenv.config();

// // AWS S3 Config
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // Add food item (with S3 image)
// const addFood = async (req, res) => {
//   try {
//     const image_url = req.file.location; // ✅ S3 URL

//     const food = new foodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       image: image_url, // ✅ store S3 URL
//     });

//     await food.save();
//     res.json({ success: true, message: "Food Added", food });
//   } catch (error) {
//     console.log("Add Food Error:", error);
//     res.status(500).json({ success: false, message: "Error adding food item" });
//   }
// };

// // Get all food items
// const listFood = async (req, res) => {
//   try {
//     const foods = await foodModel.find({});
//     res.json({ success: true, data: foods });
//   } catch (error) {
//     console.log("List Food Error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error fetching food items" });
//   }
// };

// // Remove food item (also deletes image from S3)
// const removeFood = async (req, res) => {
//   try {
//     const food = await foodModel.findById(req.body.id);
//     if (!food)
//       return res
//         .status(404)
//         .json({ success: false, message: "Food not found" });

//     // ✅ Parse image key from S3 URL
//     const imageUrl = food.image;
//     const imageKey = imageUrl.split("/").pop();

//     // ✅ Delete image from S3
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: imageKey,
//     };

//     s3.deleteObject(params, async (err, data) => {
//       if (err) {
//         console.error("Error deleting image from S3:", err);
//       }

//       await foodModel.findByIdAndDelete(req.body.id);
//       res.json({ success: true, message: "Food removed" });
//     });
//   } catch (error) {
//     console.log("Remove Food Error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error removing food item" });
//   }
// };

// export { addFood, listFood, removeFood };

// AWS Storage
import foodModel from "../models/foodModel.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const addFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image URL missing" });
    }

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image, // this is already a valid S3 URL
    });

    await food.save();

    res.status(201).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(" Food Add Error:", error);
    res.status(500).json({ success: false, message: "Food Add Error" });
  }
};

// Get all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("List Food Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching food items" });
  }
};

// Remove food item and delete image from S3
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    const imageUrl = food.image;
    const imageKey = imageUrl.split("/").pop(); // assuming standard S3 URL

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageKey,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log("Remove Food Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing food item" });
  }
};

export { addFood, listFood, removeFood };
