const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require('../middlewares/AuthMiddleware')


router.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return response.status(404).json({ error: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      return response.status(401).json({ error: "Wrong username or password" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret" 
    );

    return response.json({ token: accessToken });

  } catch (error) {
    console.error("Error during login:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (request, response) => {
  const { username, password } = request.body;

  try {
    // Check if the user already exists
    const userExists = await Users.findOne({ where: { username } });
    if (userExists) {
      return response.status(400).json({ error: "Username already taken" });
    }

    // Hash the password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      username,
      password: hashedPassword,
    });

    response.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;