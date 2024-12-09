const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: "User does not exist" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Wrong username or password" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    res.json({ token: accessToken, username: user.username });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await Users.findOne({ where: { username } });
    if (userExists) return res.status(400).json({ error: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({ username, password: hashedPassword });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json({ username: req.user.username });
});

module.exports = router;