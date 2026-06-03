require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connection = require("./db/db");
const userRoute = require("./routes/userRoute");
const avatarRoute = require("./routes/avatarRoute");
const createWebSocketServer = require("./wsServer");

const app = express();

// Database Connection
connection();

// Middlewares
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://swifty-chatty-appy.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API Routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// Frontend Build Path
const frontendPath = path.join(
  __dirname,
  "..",
  "frontend",
  "dist"
);

// Serve Static Files
app.use(express.static(frontendPath));

// Catch-all Route (Express 5 Compatible)
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start Server
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// WebSocket Server
createWebSocketServer(server);