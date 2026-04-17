const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/loginDB");

const LoginSchema = new mongoose.Schema({
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
});

const Login = mongoose.model("Login", LoginSchema);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await new Login({ email, password }).save();
  res.send("Saved");
});

const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/data", async (req, res) => {
  const data = await Login.find().sort({ date: -1 });
  res.json(data);
});

app.listen(3000, () => console.log("Server running on port 3000"));
