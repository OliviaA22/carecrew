module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "patient",
    {
      ward_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "ward",
          key: "id",
        },
        allowNull: false,
      },
      hospital_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'hospital', // Table name for hospital
          key: 'id', // Primary key in the hospital table
        },
        allowNull: false, // A patient must belong to a hospital
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      medical_record_number: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      admission_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      discharge_date: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Can be null if the patient is not discharged yet
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Patient;
};
