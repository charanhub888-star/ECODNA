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



        // AI Sustainability Calculation

        const carbon_score = Math.max(
            50,
            100 - Math.floor(electricity / 10)
        );

        const energy_score = roof > 1000 ? 90 : 75;

        const water_score = water < 10000 ? 90 : 70;

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



        const data = {


            building_name: inputs[0].value,

            location: inputs[1].value,

            construction_year: inputs[2].value,

            material: selects[1].value,

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



        try {


            // Save report to backend

            const response = await fetch(
                "http://localhost:3000/api/buildings",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify(data)

                }
            );



            const result = await response.json();


            console.log("Backend Response:", result);



            if(response.ok){


                // Get latest generated report

                const reportResponse = await fetch(
                    "http://localhost:3000/api/buildings"
                );


                const reports = await reportResponse.json();



                const latestReport =
                    reports[reports.length - 1];



                // Save for dashboard

                localStorage.setItem(
                    "report",
                    JSON.stringify(latestReport)
                );



window.location.href="dashboard.html";

                alert(
                    "🌱 EcoDNA Report Generated Successfully!"
                );



                // Redirect to dashboard

                window.location.href =
                "dashboard.html";



            }
            else{


                alert(
                    result.message ||
                    "Report generation failed"
                );

            }



        }
        catch(error){


            console.error(error);


            alert(
                "Backend not connected!"
            );


        }



    });


});
async function sendMessage(){

let message =
document.getElementById("userInput").value;


let response = await fetch(
"/api/chat"{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:message
})
});


let data = await response.json();


document.getElementById("chatBox").innerHTML +=
`
<p><b>You:</b> ${message}</p>

<p>
<b>EcoDNA AI:</b>
${data.reply}
</p>
`;

}