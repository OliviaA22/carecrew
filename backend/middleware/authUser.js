const jwt = require("jsonwebtoken");
const db = require("../models");
const Ward = db.Ward;
const User = db.User;
const Hospital = db.Hospital;

// const authenticateUser = async (req, res, next) => {
//   try {
//     // Extract token from cookie or header
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Authentication token missing" });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.SECRETE);

//     // Fetch user from the database
//     const user = await User.findByPk(decoded.userId, {
//       attributes: ["id", "first_name", "last_name", "role", "email", "ward_id"],
//       include: [{ model: Ward, attributes: ["id", "name"] }],
//     });

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // Attach the user to req.user for all subsequent requests
//     req.user = {
//       id: user.id,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       role: user.role, // Attach ward ID for ward-based queries
//       email: user.email,
//       ward_id: user.ward_id,
//     };
//     next(); // Continue to the next middleware or controller
//   } catch (error) {
//     console.error("Authentication error:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = {
//     authenticateUser,
//   };
//   ;

const authenticateUser = async (req, res, next) => {
  try {
    let userId;

    // 🔹 1. Check for session-based authentication (for web clients)
    if (req.session && req.session.userId) {
      userId = req.session.userId; // Extract user ID from session
    } else {
      // 🔹 2. Check for JWT token in cookies or headers (for API clients)
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }

      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.SECRETE);
      userId = decoded.userId;
    }

    // 🔹 3. Fetch the full user object from the database
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Ward,
          attributes: ["id", "name"],
        },
        {
          model: Hospital,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔹 4. Convert the Sequelize instance to a plain JSON object
    req.user = user.toJSON(); 

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid or expired session/token" });
  }
};


module.exports = {
  authenticateUser,
};
