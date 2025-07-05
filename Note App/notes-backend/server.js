const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoute");

// Load environment variable from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app instance
const app = express();

// Middleware to enable CORS (allow frontend to talk to backend)
app.use(cors());

// Middleware to parse incoming JSON payloads (e.g from frontend forms)
app.use(express.json());

// Route handling - all /api/notes routes go to the noteRoutes file
app.use("/api/notes", noteRoutes);

// Fallback route
app.get("/", (req, res) => {
  res.send("Notes API is running");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
