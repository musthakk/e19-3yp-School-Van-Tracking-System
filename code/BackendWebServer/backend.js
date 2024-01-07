const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Enable parsing of JSON in requests

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://musthak:Mk741300@cluster0.zl8gzee.mongodb.net/SureWay2024"
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  verified: { type: Number, default: -1 },
});

// Create a User model based on the schema
const User = mongoose.model("User", userSchema, "Users");

app.get("/forRegistration", async (req, res) => {
  try {
    // Retrieve all users from the 'Sureway' collection
    const usersNeedToRegister = await User.find({ verified: 0 }).select(
      "-hashedPassword"
    );

    // Print the data to the console
    console.log("User needs to register:", usersNeedToRegister);

    res.json({
      success: true,
      message: "Data retrieval successful",
      users: usersNeedToRegister,
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/registeredUsers", async (req, res) => {
  try {
    // Retrieve all users from the 'Sureway' collection
    const registeredUsers = await User.find({ verified: 1 }).select(
      "-hashedPassword"
    );

    // Print the data to the console
    console.log("Registered users:", registeredUsers);

    res.json({
      success: true,
      message: "Data retrieval successful",
      users: registeredUsers,
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
