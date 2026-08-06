const db = require("./database");
const express = require("express");
const cors = require("cors");

const buildingRoutes = require("./routes/buildingRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/buildings", buildingRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 EcoDNA Backend is Running Successfully!");
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});