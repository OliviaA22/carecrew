module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define(
    "shift",
    {
      nurse_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
      }, // When medication ends (nullable for ongoing shifts)
      status: {
        type: DataTypes.ENUM("pending", "in progress", "completed"),
        defaultValue: "pending",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true, // Handover notes
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Shift;
};
