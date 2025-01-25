module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define(
    "hospital",
    {
        name: { 
          type: DataTypes.STRING(100), 
          allowNull: false 
        },
        address: { 
          type: DataTypes.TEXT, 
          allowNull: false 
        },
        phone_number: { 
          type: DataTypes.STRING(20) 
        },
        email: { 
          type: DataTypes.STRING(100) 
        },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Hospital;
};

