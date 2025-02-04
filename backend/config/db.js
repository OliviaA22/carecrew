const fs = require("fs");
const path = require("path");

const config = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB_NAME || "carecrew",
  // This part 'process.env.DB_PASSWORD || ' from the line above should be
  // commented or removed when running the app on local machine(no docker)
  // using xammp...
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 50000,
    idle: 10000,
  },
};

// Check if running in Docker environment
if (process.env.DOCKER_ENV === "true") {
  // Docker environment: Disable SSL
  config.dialectOptions = {
    ssl: null,
  };
} else {
  // Local environment: Use SSL with CA certificate
  config.dialectOptions = {
    ssl: {
      ca: fs.readFileSync(
        path.resolve(__dirname, "./DigiCertGlobalRootCA.crt.pem")
      ),
    },
  };
}

module.exports = config;
