module.exports = (sequelize, DataTypes) => {
  const ShiftHandover = sequelize.define(
    "shift_handover",
    {
      from_nurse_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user', // Outgoing nurse
          key: 'id',
        },
        allowNull: false,
      },
      to_nurse_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user', // Incoming nurse
          key: 'id',
        },
        allowNull: false,
      },
      // patient_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'patient', // Associated patient
      //     key: 'id',
      //   },
      //   allowNull: false,
      // },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true, // Handover notes specific to the patient
      },
      pending_tasks: {
        type: DataTypes.TEXT,
        allowNull: true, // Summary of unfinished tasks for the patient
      },
    },
    {
      freezeTableName: true,
    }
  );

  return ShiftHandover;
};
