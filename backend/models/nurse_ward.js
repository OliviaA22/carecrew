// module.exports = (sequelize, DataTypes) => {
//     const NurseWard = sequelize.define(
//       "nurse_ward",
//       {
//         nurse_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             references: { model: 'User', 
//                 key: 'id' 
//             },
//             allowNull: false,
//           },
//         ward_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             references: { 
//                 model: 'ward', 
//                 key: 'id' 
//             },
//             allowNull: false,
//           },
//       },
//       {
//         freezeTableName: true,
//       }
//     );
//     return NurseWard;
//   };
