module.exports = (sequelize, DataTypes) => {
    const MedicationPlan = sequelize.define(
      "medication_plan",
      {
        patient_id: {
            type: DataTypes.INTEGER,
            references: { 
                model: 'patient', 
                key: 'id' 
            },
            allowNull: false,
          },
          created_by: {
            type: DataTypes.INTEGER, // ID of the doctor or prescriber (linked to User table)
            references: { 
                model: 'user', 
                key: 'id' 
            },
            allowNull: false,
          },
          valid_from: { 
            type: DataTypes.DATEONLY, 
            allowNull: false 
        }, // Start date of the plan
          valid_until: { 
            type: DataTypes.DATEONLY }, // End date (nullable for ongoing plans)
          additional_notes: { type: DataTypes.TEXT }, // General notes for the plan
      },
      {
        freezeTableName: true,
      }
    );
  
    return MedicationPlan;
  };