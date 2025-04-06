// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";

// // Generate JWT Token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" }); // Change "your_secret_key"
// };

// // Login User
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Validate Input
//     if (!email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Find User
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Check Password
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // Generate Token
//     const token = createToken(user._id);
//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // Register User
// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Validate Inputs
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ error: "Invalid email" });
//     }
//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ error: "Password must be at least 6 characters" });
//     }

//     // Check If User Exists
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ error: "Email already in use" });
//     }

//     // Hash Password
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     // Create User
//     const user = await userModel.create({ name, email, password: hash });

//     // Generate Token
//     const token = createToken(user._id);
//     res.status(201).json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// export { loginUser, registerUser };
// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";

// // Generate JWT Token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" }); // Change "your_secret_key"
// };

// // Login User
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Validate Input
//     if (!email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Find User
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Check Password
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // Generate Token
//     const token = createToken(user._id);
//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // Register User
// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Validate Inputs
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ error: "Invalid email" });
//     }
//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ error: "Password must be at least 6 characters" });
//     }

//     // Check If User Exists
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ error: "Email already in use" });
//     }

//     // Hash Password
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     // Create User
//     const user = await userModel.create({ name, email, password: hash });

//     // Generate Token
//     const token = createToken(user._id);
//     res.status(201).json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// export { loginUser, registerUser };

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Ensure email and password are extracted from the request body

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exit" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentails" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//user token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checking is user already exits
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exits" });
    }
    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export { loginUser, registerUser };
