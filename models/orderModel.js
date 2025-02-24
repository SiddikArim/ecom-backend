import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    thana: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "card", "bank", "btc"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "Processing",
        "On the Way",
        "Delivered",
        "Canceled",
        "Stock Out",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
