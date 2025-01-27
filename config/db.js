const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,  // 🔹 Conexión por IP Privada
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;

