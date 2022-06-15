const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const returnSignupPage = (req, res) => {
	res.render("signup");
};

const returnLoginPage = (req, res) => {
	res.render("login");
};

const createUser = async (req, res) => {
	//signup code
	const { email, password } = req.body;
	const user = new User({ email, password });
	try {
		// const salt = await bcrypt.genSalt();
		user.password = await bcrypt.hash(password, 10);
		await user.save();
		const token = jwt.sign({ id: user._id }, "mern-sercet", { expiresIn: 24 * 60 * 60 });
		res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 });
		res.send({ id: user._id });
	} catch (e) {
		console.log("Error occoured " + e);
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.redirect("/signup");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		res.redirect("/login");
	}
	const token = jwt.sign({ id: user._id }, "mern-sercet", { expiresIn: 24 * 60 * 60 });
	res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 });

	res.redirect(307, "/burgers");
};
const logoutUser = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/");
};

module.exports = {
	returnSignupPage,
	returnLoginPage,
	createUser,
	loginUser,
	logoutUser,
};
