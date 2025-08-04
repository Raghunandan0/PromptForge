
// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import fetch from 'node-fetch';
// import mongoose from "mongoose";
// import chatRoutes from "./routes/chat.js";



// const app = express();
// const PORT = 8080;

// app.use(express.json());
// app.use(cors());

// app.use("/api", chatRoutes);

// app.listen(PORT, () => {
//   console.log(`server running on ${PORT}`);
//   connectDB();
// });

// const connectDB = async() => {
//   try{
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected with DB!");
//   } catch(err){
//     console.log("Failed with connect with DB", err);
//   }
// }









// server.js (your updated main entry point)
/*import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ New auth route

const app = express();
const PORT = process.env.PORT || 8080; // ✅ Dynamic port for deployment support

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", chatRoutes); // existing route
// app.use("/api/auth", authRoutes); // ✅ new auth route

// Start server only after DB is connected
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to connect to DB", err);
  }
};

connectDB();  */








import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js"; // ✅ renamed to match actual filename

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", chatRoutes);       // ✅ existing routes (threads, chat, etc.)
app.use("/api/auth", authRoutes);  // ✅ NEW auth routes (register/login)

// Start server after MongoDB connects
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
  }
};

connectDB();

