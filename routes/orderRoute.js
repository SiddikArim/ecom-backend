import express from "express";
import {
  allOrders,
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js"; // Middleware to protect routes
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// POST: Create Order (Protected Route)
orderRouter.post("/", protect, createOrder);
orderRouter.get("/my-orders", protect, getMyOrders);
orderRouter.get("/admin-order-view", adminAuth, allOrders);
orderRouter.get("/admin-order-view/:id", adminAuth, getOrderById);
orderRouter.put("/:orderId/status", adminAuth, updateOrderStatus);

export default orderRouter;
