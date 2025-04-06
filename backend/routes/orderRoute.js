// import express from "express";
// import authMiddleware from "../middleware/auth.js";
// import placeOrder from "../controllers/orderController.js";

// const orderRouter = express.Router();

// orderRouter.post("/order", authMiddleware, placeOrder);

// export default orderRouter;

import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, userOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

// Place an order (no payment gateway, just stores order in DB)
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

export default orderRouter;
