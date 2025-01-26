const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");

function isLoggedIn(req, res, next) {
  // Get the token from the request
  const token = req.cookies ? req.cookies.token : null;
  if (!token) {
    return res.status(401).json({ error: "No token found. You need to login" });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRETE, async (error, user) => {
    if (error) {
      return res.status(403).json({ error: error.message });
    }

    try {
      const verifyUser = await UserService.findOne({
        where: {
          id: user.userId,
        },
      });

      if (!verifyUser) {
        return res.status(404).json({ error: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });
}

module.exports = isLoggedIn;