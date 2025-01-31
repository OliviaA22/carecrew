module.exports = (sequelize, DataTypes) => {
  const MedicationItem = sequelize.define(
    "medication_item",
    {
      plan_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "medication_plan",
          key: "id",
        },
        allowNull: false,
      },
      medication_id: {
        type: DataTypes.INTEGER, // Links to the Medication table for medication details
        references: {
          model: "medication",
          key: "id",
        },
        allowNull: false,
      },
      dose: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }, // E.g., "500mg"
      frequency: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }, // E.g., "Twice a day"
      route_of_administration: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }, // E.g., "Oral, Injection"
      instructions: {
        type: DataTypes.TEXT,
      }, // Additional instructions for use
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      }, // When medication ends
      scheduled_time: { 
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("completed", "due"),
        defaultValue: "due",
      },
    },
    {
      freezeTableName: true,
    }
  );

  return MedicationItem;
};
