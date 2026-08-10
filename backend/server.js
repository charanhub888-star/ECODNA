require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./database");
const buildingRoutes = require("./routes/buildingRoutes");
const chat = require("./routes/chat");

const app = express();

// ==========================================
// Middleware
// ==========================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// ==========================================
// Serve Frontend
// ==========================================

app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);

// ==========================================
// API Routes
// ==========================================

app.use(
    "/api/buildings",
    buildingRoutes
);

app.use(
    "/api/chat",
    chat
);

// ==========================================
// Frontend Home Page
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );

});

// ==========================================
// Start Server
// ==========================================

const PORT =
    process.env.PORT || 3000;

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `EcoDNA server running on port ${PORT}`
        );

    }
);