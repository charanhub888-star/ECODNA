document.addEventListener("DOMContentLoaded", () => {

    const ecoForm = document.getElementById("ecoForm");

    if (!ecoForm) return;

    ecoForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const inputs = document.querySelectorAll("input");
        const selects = document.querySelectorAll("select");

        const electricity = Number(inputs[4].value);
        const water = Number(inputs[5].value);
        const roof = Number(inputs[3].value);

        // ==============================
        // AI Sustainability Calculation
        // ==============================

        const carbon_score = Math.max(
            50,
            100 - Math.floor(electricity / 10)
        );

        const energy_score =
            roof > 1000 ? 90 : 75;

        const water_score =
            water < 10000 ? 90 : 70;

        const biodiversity_score = 80;

        const climate_score = 85;

        const overall_score = Math.round(
            (
                carbon_score +
                energy_score +
                water_score +
                biodiversity_score +
                climate_score
            ) / 5
        );

        // ==============================
        // Building Data
        // ==============================

        const data = {

            building_name: inputs[0].value,

            location: inputs[1].value,

            construction_year: inputs[2].value,

            material: selects[1]
                ? selects[1].value
                : "",

            roof_area: inputs[3].value,

            electricity_bill: inputs[4].value,

            water_usage: inputs[5].value,

            occupants: inputs[6].value,

            carbon_score,

            energy_score,

            water_score,

            biodiversity_score,

            climate_score,

            overall_score

        };

        console.log("Sending Data:", data);

        // ==============================
        // Send Building Data
        // ==============================

        try {

            const response = await fetch(
                "/api/buildings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            console.log(
                "Backend Response:",
                result
            );

            if (response.ok) {

                // ==============================
                // Get Latest Report
                // ==============================

                const reportResponse = await fetch(
                    "/api/buildings"
                );

                if (!reportResponse.ok) {
                    throw new Error(
                        "Could not retrieve reports"
                    );
                }

                const reports =
                    await reportResponse.json();

                const latestReport =
                    reports[reports.length - 1];

                // ==============================
                // Save Report
                // ==============================

                localStorage.setItem(
                    "report",
                    JSON.stringify(latestReport)
                );

                alert(
                    "🌱 EcoDNA Report Generated Successfully!"
                );

                // ==============================
                // Redirect to Dashboard
                // ==============================

                window.location.href =
                    "dashboard.html";

            } else {

                alert(
                    result.message ||
                    "Report generation failed"
                );

            }

        } catch (error) {

            console.error(
                "Building API Error:",
                error
            );

            alert(
                "Backend not connected or an error occurred."
            );

        }

    });

});


// ======================================
// EcoDNA AI Chat
// ======================================

async function sendMessage() {

    const input =
        document.getElementById("userInput");

    const chatBox =
        document.getElementById("chatBox");

    if (!input || !chatBox) {
        console.error(
            "Chat elements not found."
        );
        return;
    }

    const message =
        input.value.trim();

    if (!message) {
        return;
    }

    // Show user message

    chatBox.innerHTML += `
        <div class="user-message">
            <strong>You:</strong> ${message}
        </div>
    `;

    input.value = "";

    try {

        const response = await fetch(
            "/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data =
            await response.json();

        console.log(
            "Chat Response:",
            data
        );

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Chat request failed"
            );

        }

        // Support common backend response formats

        const reply =
            data.reply ||
            data.response ||
            data.message ||
            "Sorry, I couldn't generate a response.";

        chatBox.innerHTML += `
            <div class="bot-message">
                <strong>EcoDNA AI:</strong> ${reply}
            </div>
        `;

        // Scroll to latest message

        chatBox.scrollTop =
            chatBox.scrollHeight;

    } catch (error) {

        console.error(
            "Chat API Error:",
            error
        );

        chatBox.innerHTML += `
            <div class="bot-message">
                <strong>EcoDNA AI:</strong>
                Sorry, I couldn't connect to the AI service.
            </div>
        `;

    }

}