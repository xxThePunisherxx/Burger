const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
	const { jwt: token } = req.cookies;
	try {
		jwt.verify(token, "mern-sercet");
		next();

		// console.log(e);
	} catch (e) {
		res.redirect("/login");
	}
};

module.exports = { requireAuth };
