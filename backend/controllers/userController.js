import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Generate JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" }); // Change "your_secret_key"
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate Input
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check Password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate Token
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate Inputs
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    // Check If User Exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create User
    const user = await userModel.create({ name, email, password: hash });

    // Generate Token
    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { loginUser, registerUser };
