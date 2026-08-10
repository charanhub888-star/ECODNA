require("dotenv").config();

const db = require("./database");
const express = require("express");
const cors = require("cors");

const buildingRoutes = require("./routes/buildingRoutes");
const chat = require("./routes/chat");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// API Routes
app.use("/api/buildings", buildingRoutes);
app.use("/api/chat", chat);


// Home Route
app.get("/", (req, res) => {
    res.send("🚀 EcoDNA Backend is Running Successfully!");
});


// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`EcoDNA server running on port ${PORT}`);
});