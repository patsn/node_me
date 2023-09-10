require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const userData = require("./MOCK_DATA.json");
let refreshTokenDB = []; //Should be a DB in prod.

app.use(express.json());
app.listen(3000);

function handleAccess(req, res, next) {
	const authHeaders = req.headers.authorization;
	const token = authHeaders && authHeaders.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

function genToken(user, envTOKEN, timer) {
	if (timer) {
		return jwt.sign(user, envTOKEN, { expiresIn: timer });
	} else {
		return jwt.sign(user, envTOKEN);
	}
}

////////////GET DATA
app.get("/getData", handleAccess, (req, res) => {
	res.json(userData.filter((user) => user.last_name === req.user.name));
});

////////////GET ACCESSTOKEN & REFRESH TOKEN
app.post("/login", (req, res) => {
	const username = req.body.username;
	const user = { name: username };
	const accessToken = genToken(user, process.env.SECRET_TOKEN, "15s");
	const refreshToken = genToken(user, process.env.REFRESH_TOKEN);
	refreshTokenDB.push(refreshToken);

	res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

////////////REFRESH TOKENS
app.post("/refreshAccess", (req, res) => {
	const refreshToken = req.body.refreshToken;
	if (refreshToken == null) return res.sendStatus(401);
	if (!refreshTokenDB.includes(refreshToken)) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
		if (err) return res.sendStatus(403);
		const accessToken = genToken({ name: user.name });
		res.json({ accessToken: accessToken });
	});
});

////////////DELETE REFRESH TOKENS
app.delete("/logout", (req, res) => {
	refreshTokenDB = refreshTokenDB.filter(tokens !== req.body.refreshToken);
	res.sendStatus(204);
});
