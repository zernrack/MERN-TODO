const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./mongodb");
const todoRoute = require("./routes/todoRoutes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

async function startServer() {
  try {
    await connectDB();

    app.use("/api", todoRoute);

    app.listen(port, () => {
      console.log(`Server running on port ${port} 🔥`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();
