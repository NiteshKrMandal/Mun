// import orderModel from "../models/orderModel.js"; // ✅ Fixed import paths
// import userModel from "../models/userModel.js";
// import dotenv from "dotenv";
// dotenv.config();
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Placing user order for frontend
// const placeOrder = async (req, res) => {
//   const frontend_url = "http://localhost:5173"; // Update this for production

//   try {
//     // Create new order
//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       items: req.body.items, // ✅ Fixed `items` instead of `itemId`
//       amount: req.body.amount,
//       address: req.body.address,
//     });

//     await newOrder.save();

//     // Clear cart after placing order
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     // Create line items for Stripe payment
//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: { name: item.name },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     // Add delivery charges
//     line_items.push({
//       price_data: {
//         currency: "usd",
//         product_data: { name: "Delivery Charges" },
//         unit_amount: 2 * 100,
//       },
//       quantity: 1,
//     });

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       line_items: line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // ✅ Fixed success URL
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // ✅ Fixed cancel URL
//     });

//     res.json({ success: true, session_url: session.url }); // ✅ Fixed `session_url` usage
//   } catch (error) {
//     console.error("Order Error:", error);
//     res.json({ success: false, message: "Error processing order" });
//   }
// };

// export default placeOrder;

// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import dotenv from "dotenv";
// dotenv.config();
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const placeOrder = async (req, res) => {
//   const frontend_url = "http://localhost:5173";

//   try {
//     const { userId, items, amount, address } = req.body;

//     if (!userId || !items || !amount || !address) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing required fields" });
//     }

//     const newOrder = new orderModel({
//       userId,
//       items,
//       amount,
//       address,
//     });

//     await newOrder.save();

//     // Clear cart
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     // Stripe Line Items
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: { name: item.name },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     line_items.push({
//       price_data: {
//         currency: "usd",
//         product_data: { name: "Delivery Charges" },
//         unit_amount: 200,
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.error("Order Error:", error);
//     res.status(500).json({ success: false, message: "Error processing order" });
//   }
// };

// export default placeOrder;

// Without payment

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place Order without Stripe
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Check for required fields
    if (!userId || !items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create new order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentStatus: "pending", // Optional field if you track payment later
    });

    await newOrder.save();

    // Clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export { placeOrder, userOrders };
