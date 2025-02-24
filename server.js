import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

// INFO: Create express app
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174/"];
// INFO: Middleware
app.use(express.json());
app.use(
  cors({
    allowedOrigins,
  })
);

// INFO: API endpoints
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

app.use("/api/product", productRouter);

// INFO: Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// INFO: Start server
app.listen(port, () =>
  console.log(`Server is running on at http://localhost:${port}`)
);
