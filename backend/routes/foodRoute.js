// import express from "express";
// import {
//   addFood,
//   listFood,
//   removeFood,
// } from "../controllers/foodControllers.js";
// import multer from "multer";

// const foodRouter = express.Router();

// // Image Storage Engine

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// foodRouter.post("/add", upload.single("image"), addFood);
// foodRouter.get("/list", listFood);
// foodRouter.post("/remove", removeFood);
// export default foodRouter;

// AWS
import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodControllers.js";

import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const foodRouter = express.Router();

// ✅ Use memory storage for direct S3 upload in the controller
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Define routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
