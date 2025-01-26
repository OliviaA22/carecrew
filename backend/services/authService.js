const db = require("../models");
const axios = require("axios");
bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.User;
const Ward = db.Ward;

class AuthService {
  async register(data) {
    data.email = data.email.toLowerCase();
    let user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const ward = await Ward.findByPk(data.ward_id);
    if (!ward) {
      throw new Error("Select a valid ward");
    }
    // Creating the user within a transaction to ensure data is saved correctly
    // into all tables at once
    return await db.sequelize.transaction(async (t) => {
      user = await User.create(data, { transaction: t });
      return user;
    });
  }

  async login(data) {
    data.email = data.email.toLowerCase();
    const user = await User.findOne({
      where: {
        email: data.email,
      },
      include: [
        {
          model: Ward,
        },
      ],
    });
    if (!user) throw new Error("user does not exist");

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        userId: user.dataValues.id,
        role: user.dataValues.role,
        address: user.address,
        email: user.email,
      },
      process.env.SECRETE,
      { expiresIn: "24h" }
    );
    return {
      user,
      token,
    };
  }




  async checkAuth(token) {
    if (!token) throw new Error("No token found");

    const decoded = jwt.verify(token, process.env.SECRETE);
    const user = await User.findByPk(decoded.userId, {
      attributes: ["id", "first_name", "last_name", "role", "email", "address"],
      include: [
        {
          model: Ward,
        },
      ],
    });
    if (!user) throw new Error("User not found");
    return user;
  }
}

module.exports = new AuthService();
