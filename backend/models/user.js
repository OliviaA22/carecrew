module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      first_name: { 
        type: DataTypes.STRING(50), 
        allowNull: false },
      last_name: { 
        type: DataTypes.STRING(50), 
        allowNull: false },
      email: { 
        type: DataTypes.STRING(100), 
        unique: true, 
        allowNull: false },
      password: { 
        type: DataTypes.STRING(255), 
        allowNull: false },
      role: { 
        type: DataTypes.ENUM("nurse", "admin"), 
        allowNull: false },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(25),
      },
      gender: {
        type: DataTypes.STRING(15),
      },
      address: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      hospital_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "hospital",
          key: "id",
        },
        allowNull: false,
      },
      ward_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "ward",
          key: "id",
        },
        allowNull: false, // A nurse must belong to a ward
      },
    },
    {
      freezeTableName: true,
    }
  );
  return User;
};
