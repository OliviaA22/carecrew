module.exports = (sequelize, DataTypes) => {
  const MedicationAdministration = sequelize.define(
    "medication_administration",
    {
      med_item_id: {
        type: DataTypes.INTEGER,
        references: { 
          model: 'medication_item', 
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
      administered_by: {
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
