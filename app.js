const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const app = express();
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb+srv://Nikesh:KmktVctWLBLb7zV@cluster0.mymgh.mongodb.net/mern-login";
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then((result) => app.listen(3000))
	.catch((err) => console.log("cannot connect to Mongoose server on " + dbURI));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/burgers", requireAuth, (req, res) => res.render("burgers"));
app.use(authRoutes);
