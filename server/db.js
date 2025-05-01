const mysql = require('mysql2');

// Use dotenv *only for local dev* (ignored on Azure)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log("🔌 DB config:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    // TEMPORARY for Azure Flexible Server — set to true after validation
    rejectUnauthorized: false 
  }
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
    
    // Run a test query to validate connection
    db.query('SELECT 1', (err, results) => {
      if (err) {
        console.error("❌ Test Query Failed:", err);
      } else {
        console.log("✅ Test Query Result:", results);
      }
    });
  }
});

module.exports = db;
