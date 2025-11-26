const mysql = require('mysql2/promise');

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'danish',
      password: '1234',
      database: 'testing'
    });

    console.log("✅ MySQL connected!");
    return connection;
  } catch (err) {
    console.error("MySQL connection error:", err);
    throw err;
  }
}

module.exports = connectDB;
