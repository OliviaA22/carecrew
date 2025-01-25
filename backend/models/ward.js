module.exports = (sequelize, DataTypes) => {
    const Ward = sequelize.define(
      "ward",
      {
        hospital_id: {
            type: DataTypes.INTEGER,
            references: { 
                model: 'hospital', 
                key: 'id' 
            },
            allowNull: false,
        },
        name: { 
            type: DataTypes.STRING(50), 
            allowNull: false 
        },
   },
   {
    freezeTableName: true,
  }
  
    );
  
    return Ward;
  };

  