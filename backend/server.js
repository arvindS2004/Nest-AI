if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env"
  });
}

const app = require("./app");
const connectDatabase = require("./db/Database.js");
const cloudinary = require("cloudinary");

// Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  console.log(`Shutting down server due to uncaught exception`);
  process.exit(1);
});

// Load .env locally


// Connect DB
connectDatabase();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Start server (use PORT provided by Render or fallback)
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is working on port: ${PORT}`);
});

console.log("Mongo URI:", process.env.MONGO_URI);

// Unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection: ${err && err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
