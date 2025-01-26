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
      schedule: { 
        type: DataTypes.JSON
      }, // Times of day to administer, e.g., ["08:00", "14:00", "20:00"]
      recurrence: { 
        type: DataTypes.STRING(50), 
        defaultValue: "daily" 
      }, // e.g., "daily", "every 6 hours"
      status: {
        type: DataTypes.ENUM("administered", "missed", "due"),
        defaultValue: "due",
      },
      time_administered: {
        type: DataTypes.DATE,
      }, // Timestamp of administration
      skipped_notes: {
        type: DataTypes.TEXT,
      }, // reasons for missed medications
    },
    {
      freezeTableName: true,
    }
  );

  return MedicationItem;
};
