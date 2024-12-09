const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken; 
    next();
  } catch (err) {
    return res.json({ error: "Token is not valid" });
  }
};

module.exports = { validateToken };