const db = require("../database");

// =============================
// Create a New Building
// =============================
exports.createBuilding = (req, res) => {

    const {
        building_name,
        location,
        construction_year,
        material,
        roof_area,
        electricity_bill,
        occupants,
        carbon_score,
        energy_score,
        water_score,
        biodiversity_score,
        climate_score,
        overall_score
    } = req.body;

    // Validation
    if (
        !building_name ||
        !location ||
        !construction_year ||
        !material ||
        !roof_area ||
        !electricity_bill ||
        !occupants
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    const sql = `
        INSERT INTO Buildings (
            building_name,
            location,
            construction_year,
            material,
            roof_area,
            electricity_bill,
            occupants,
            carbon_score,
            energy_score,
            water_score,
            biodiversity_score,
            climate_score,
            overall_score
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            building_name,
            location,
            construction_year,
            material,
            roof_area,
            electricity_bill,
            occupants,
            carbon_score,
            energy_score,
            water_score,
            biodiversity_score,
            climate_score,
            overall_score
        ],
        function (err) {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Building added successfully!",
                id: this.lastID
            });

        }
    );

    
};

// =============================
// Get All Buildings
// =============================
exports.getBuildings = (req, res) => {

    const sql = "SELECT * FROM Buildings";

    db.all(sql, [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(rows);

    });

};

// =============================
// Get Building By ID
// =============================
exports.getBuildingById = (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM Buildings WHERE id = ?";

    db.get(sql, [id], (err, row) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (!row) {
            return res.status(404).json({
                success: false,
                message: "Building not found."
            });
        }

        res.json(row);

    });

};

// =============================
// Update Building
// =============================
exports.updateBuilding = (req, res) => {

    const id = req.params.id;

    const {
        building_name,
        location,
        construction_year,
        material,
        roof_area,
        electricity_bill,
        occupants,
        carbon_score,
        energy_score,
        water_score,
        biodiversity_score,
        climate_score,
        overall_score
    } = req.body;

    const sql = `
        UPDATE Buildings
        SET
            building_name=?,
            location=?,
            construction_year=?,
            material=?,
            roof_area=?,
            electricity_bill=?,
            occupants=?,
            carbon_score=?,
            energy_score=?,
            water_score=?,
            biodiversity_score=?,
            climate_score=?,
            overall_score=?
        WHERE id=?
    `;

    db.run(
        sql,
        [
            building_name,
            location,
            construction_year,
            material,
            roof_area,
            electricity_bill,
            occupants,
            carbon_score,
            energy_score,
            water_score,
            biodiversity_score,
            climate_score,
            overall_score,
            id
        ],
        function (err) {

            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Building updated successfully!"
            });

        }
    );

};

// =============================
// Delete Building
// =============================
exports.deleteBuilding = (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM Buildings WHERE id = ?";

    db.run(sql, [id], function (err) {

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Building not found."
            });
        }

        res.json({
            success: true,
            message: "Building deleted successfully!"
        });

    });

};