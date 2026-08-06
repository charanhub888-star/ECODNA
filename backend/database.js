const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database file path
const dbPath = path.join(__dirname, "database", "ecodna.db");

// Connect to SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Connected to EcoDNA Database");
    }
});

// Create Buildings table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Buildings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            building_name TEXT NOT NULL,
            location TEXT NOT NULL,
            construction_year INTEGER,
            material TEXT,
            roof_area REAL,
            electricity_bill REAL,
            occupants INTEGER,
            carbon_score REAL,
            energy_score REAL,
            water_score REAL,
            biodiversity_score REAL,
            climate_score REAL,
            overall_score REAL
        )
    `, (err) => {
        if (err) {
            console.error("❌ Error creating table:", err.message);
        } else {
            console.log("✅ Buildings table is ready.");
        }
    });
});

module.exports = db;