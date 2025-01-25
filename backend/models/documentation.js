
// This table stores real-time notes and observations made by nurses for specific patients. 
// It includes categories for different types of notes (e.g., observations, incidents, care plans). 
// It also includes a timestamp for each note and a reference to the nurse who made the note.
// The patient_id and nurse_id fields are foreign keys that reference the patient and user tables, respectively.

module.exports = (sequelize, DataTypes) => {
    const Documentation = sequelize.define(
      "documentation",
      {
        patient_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'patient', // Info of the patient from the patient table
              key: 'id',
            },
            allowNull: false,
          },
          nurse_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user', // Name of the nurse from the user table
              key: 'id',
            },
            allowNull: false,
          },
          notes: {
            type: DataTypes.TEXT,
            allowNull: false, // Notes entered by the nurse
          },
          category: {
            type: DataTypes.ENUM('observation', 'incident', 'care plan'),
            allowNull: false, // Type of note
          },
      },
      {
        freezeTableName: true,
      }
    );
  
    return Documentation;
  };
  
