require("dotenv").config();

const dbConfig = require("../config/db.js");

const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

db.Hospital = require("./hospital.js")(sequelize, DataTypes);
db.User = require("./user.js")(sequelize, DataTypes);
db.Ward = require("./ward.js")(sequelize, DataTypes);
db.Patient = require("./patient.js")(sequelize, DataTypes);
db.Medication = require("./medication.js")(sequelize, DataTypes);
db.MedicationItem = require("./medication_item.js")(sequelize, DataTypes);
db.MedicationPlan = require("./medication_plan.js")(sequelize, DataTypes);
db.Documentation = require("./documentation.js")(sequelize, DataTypes);
db.MedicationAdministration = require("./medication_administration.js")(sequelize, DataTypes);
db.Shift = require("./shift.js")(sequelize, DataTypes);
db.Notification = require("./notification.js")(sequelize, DataTypes);

// Define relationships
db.User.belongsTo(db.Hospital, {
  foreignKey: "hospital_id",
});
db.Hospital.hasMany(db.User, {
  foreignKey: "hospital_id",
});

db.User.hasMany(db.Documentation, {
  foreignKey: "nurse_id",
});
db.Documentation.belongsTo(db.User, {
  foreignKey: "nurse_id",
});

db.User.hasMany(db.MedicationAdministration, {
  foreignKey: "administered_by",
});
db.MedicationAdministration.belongsTo(db.User, {
  foreignKey: "administered_by",
});

db.User.hasMany(db.MedicationPlan, {
  foreignKey: "created_by",
});
db.MedicationPlan.belongsTo(db.User, {
  foreignKey: "created_by",
});

// Hospital Table Relationships
db.Hospital.hasMany(db.Ward, {
  foreignKey: "hospital_id",
});
db.Ward.belongsTo(db.Hospital, {
  foreignKey: "hospital_id",
});

db.Hospital.hasMany(db.Patient, {
  foreignKey: "hospital_id",
});
db.Patient.belongsTo(db.Hospital, {
  foreignKey: "hospital_id",
});

// Ward Table Relationships

db.Ward.hasMany(db.Patient, {
  foreignKey: "ward_id",
});
db.Patient.belongsTo(db.Ward, {
  foreignKey: "ward_id",
});

db.Ward.hasMany(db.User, {
  foreignKey: "ward_id",
});
db.User.belongsTo(db.Ward, {
  foreignKey: "ward_id",
});

db.Ward.hasMany(db.Notification, {
  foreignKey: "ward_id",
});
db.Notification.belongsTo(db.Ward, {
  foreignKey: "ward_id",
});


// Patient Table Relationships
db.Patient.hasMany(db.MedicationPlan, {
  foreignKey: "patient_id",
});
db.MedicationPlan.belongsTo(db.Patient, {
  foreignKey: "patient_id",
});

db.Patient.hasMany(db.Documentation, {
  foreignKey: "patient_id",
});
db.Documentation.belongsTo(db.Patient, {
  foreignKey: "patient_id",
});

db.Patient.hasMany(db.MedicationAdministration, {
  foreignKey: "patient_id",
});
db.MedicationAdministration.belongsTo(db.Patient, {
  foreignKey: "patient_id",
});



// Medication Plan Table Relationships

db.MedicationPlan.belongsTo(db.User, {
  foreignKey: "created_by",
});
db.User.hasMany(db.MedicationPlan, {
  foreignKey: "created_by",
});

// Medication Table Relationships
db.MedicationItem.hasMany(db.MedicationAdministration, {
  foreignKey: "med_item_id",
});
db.MedicationAdministration.belongsTo(db.MedicationItem, {
  foreignKey: "med_item_id",
});

// Shift Handover Table Relationships
db.Shift.belongsTo(db.User, {
  foreignKey: "nurse_id",
});
db.User.hasMany(db.Shift, {
  foreignKey: "nurse_id",
});


//Medication Item Table Relationships
db.MedicationItem.belongsTo(db.Medication, {
  foreignKey: "medication_id",
});
db.Medication.hasMany(db.MedicationItem, {
  foreignKey: "medication_id",
});

db.MedicationItem.belongsTo(db.MedicationPlan, {
  foreignKey: 'plan_id',
});
db.MedicationPlan.hasMany(db.MedicationItem, {
  foreignKey: 'plan_id',
});

db.MedicationPlan.belongsTo(db.Patient, {
  foreignKey: 'patient_id',
});
db.Patient.hasMany(db.MedicationPlan, {
  foreignKey: 'patient_id',
});

// Notification Table Relationships

db.Notification.belongsTo(db.Patient, {
  foreignKey: "patient_id",
});
db.Patient.hasMany(db.Notification, {
  foreignKey: "patient_id",
});

db.Notification.belongsTo(db.MedicationItem, { 
  foreignKey: "medication_item_id" 
});
db.MedicationItem.hasMany(db.Notification, { 
  foreignKey: "medication_item_id" 
});



db.sequelize
  .sync({ force: false })
  .then(() => {})
  .catch((err) => {
    console.log("Error: " + err);
  });
module.exports = db;
