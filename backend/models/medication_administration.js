module.exports = (sequelize, DataTypes) => {
  const MedicationAdministration = sequelize.define(
    "medication_administration",
    {
      medication_id: {
        type: DataTypes.INTEGER,
        references: { 
          model: 'medication', 
          key: 'id' 
        },
        allowNull: false,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        references: { 
          model: 'patient', 
          key: 'id' 
        },
        allowNull: false,
      },
      nurse_id: {
        type: DataTypes.INTEGER,
        references: { 
          model: 'user', 
          key: 'id' 
        },
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('administered', 'skipped'),
        allowNull: false,
      },
      notes: { 
        type: DataTypes.TEXT 
      }, // Notes for skipped doses
      time_administered: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
      },
    },
    {
      freezeTableName: true,
    }
  );
  return MedicationAdministration;
};
