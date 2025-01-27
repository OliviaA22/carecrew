module.exports = (sequelize, DataTypes) => {
  const Medication = sequelize.define(
    "medication",
    {
      name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
      description: { 
        type: DataTypes.TEXT 
    },
      dosage_form: { 
        type: DataTypes.STRING(50) 
    },
      strength: { 
        type: DataTypes.STRING(50) 
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Medication;
};
