const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.listen(3000);

const users = [];

//get all users => DB in prod.
app.get("/users", (req, res) => {
	res.json(users);
});

//create user
app.post("/users", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = { uuid: uuidv4(), name: req.body.name, password: hashedPassword };
		users.push(user);
		res.sendStatus(201);
	} catch {
		res.sendStatus(500);
	}
});

//login as user
app.post("/users/login", async (req, res) => {
	const user = users.find((user) => user.name === req.body.name);
	if (user == null) {
		return res.status(400).send("Cannot find user");
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			res.send("Success");
		} else {
			res.send("Not Allowed");
		}
	} catch {
		res.sendStatus(500);
	}
});
