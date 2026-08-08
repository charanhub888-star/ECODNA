const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "work",
    database: "ecodna"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    } else {
        console.log("✅ MySQL Connected");
    }
});

module.exports = db;