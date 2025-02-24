import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private (only logged-in users)
 */
const calculateTotalAmount = async (items) => {
  let totalAmount = 0;

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error(`Product not found: ${item.productId}`);

    totalAmount += product.price * item.quantity;
  }

  return totalAmount;
};
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // Retrieved from auth middleware
    const {
      firstName,
      lastName,
      email,
      mobile,
      street,
      thana,
      city,
      division,
      postalCode,
      items,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No items in the order." });
    }

    // Calculate totalAmount from cart items
    const totalAmount = await calculateTotalAmount(items);

    // Create new order
    const newOrder = new Order({
      userId,
      firstName,
      lastName,
      email,
      mobile,
      street,
      thana,
      city,
      division,
      postalCode,
      items,
      totalAmount, // Calculated from database
      paymentMethod,
      status: "pending",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};
export const getMyOrders = async (req, res) => {
  try {
    // Get user ID from authenticated request
    const userId = req.user.id;

    // Find orders that belong to the logged-in user
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const allOrders = async (req, res) => {
  try {
    // Find orders that belong to the logged-in user
    const orders = await Order.find().sort({ createdAt: -1 });

    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id; // Get the order ID from URL
    const order = await Order.findById(orderId); // Fetch order from database

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params; // Get order ID from URL
    const { status } = req.body; // Get new status from request body

    // Check if order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Update order status
    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
