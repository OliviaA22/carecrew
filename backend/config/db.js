const fs = require("fs");
const path = require("path");

const isAiven = process.env.DB_PROVIDER === "aiven";

const config = {
  HOST: process.env.DB_HOST || "localhost",
  PORT: Number(process.env.DB_PORT || 3306),
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB_NAME || "carecrew",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 50000,
    idle: 10000,
  },
};

if (isAiven) {
  config.dialectOptions = {
    connectTimeout: 60000,
    ssl: {
      rejectUnauthorized: true,

      // Render: CA certificate stored as a secret environment variable.
      // Local Mac: CA certificate loaded from a local file.
      ca: process.env.DB_SSL_CA
        ? process.env.DB_SSL_CA
        : fs.readFileSync(path.resolve(__dirname, "./ca.pem")),
    },
  };
} else {
  // Local MySQL / Docker MySQL
  config.dialectOptions = {
    ssl: false,
  };
}

module.exports = config;
