const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./mongodb");
const todoRoute = require("./routes/todoRoutes");

const app = express();
const port = process.env.PORT;

app.use(express.json()); // Enable JSON parsing middleware
app.use(cors()); // Enable CORS middleware

async function startServer() {
  try {
    await connectDB();

    // Use the todoRoute for requests starting with /api
    app.use("/api", todoRoute);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port} 🔥`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();
