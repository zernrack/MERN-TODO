const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB CONNECTED 🔥🔥");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
