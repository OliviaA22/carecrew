const axios = require("axios");
const db = require("../models");
bcrypt = require("bcryptjs");

const User = db.User;
const Ward = db.Ward;

class UserService {

   async createUser(data) {
    data.email = data.email.toLowerCase();
    let user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const ward = await Ward.findByPk(
      data.ward_id
    );
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


  async getNurses() {
    const nurses = await User.findAll({
      where: {
        role: "nurse",
      },
      include: [
        {
          model: Ward,
          attributes: ["name"], 
        },
      ],
    });
    return nurses;
  }


  async getUserById(userId) {
    const user = await User.findByPk(userId);
    return user;
  }

  // used in verifying logged-in user
  async findOne(data) {
    const user = await User.findOne(data);
    return user;
  }
  
  async updateUser(userId, updates) {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    updates.email = updates.email.toLowerCase();

    return await db.sequelize.transaction(async (t) => {
        await User.update(updates, {
            where: { id: userId },
            transaction: t
        });
        return await User.findByPk(userId, { transaction: t }); // Fetch the updated user
    });
}
  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return "User deleted successfully";
  }
}

module.exports = new UserService();
