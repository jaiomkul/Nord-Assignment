require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./controllers/users");
const authRoutes = require("./controllers/auth");

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// const port = process.env.PORT || 8080;
// app.listen(port, console.log(`Listening on port ${port}...`));
module.exports = app;
