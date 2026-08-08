const express = require("express");
const router = express.Router();
const OpenAI = require("openai");


// Check API key
if (!process.env.OPENAI_API_KEY) {
    console.log("❌ OPENAI_API_KEY is missing in .env file");
}


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// POST /api/chat
router.post("/", async (req, res) => {

    try {

        const userMessage = req.body.message;


        if (!userMessage) {
            return res.status(400).json({
                error: "Message is required"
            });
        }


        const response = await client.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [

                {
                    role: "system",
                    content:
                    `
                    You are EcoDNA AI Sustainability Assistant.

                    Your job:
                    - Explain sustainability concepts
                    - Analyze green buildings
                    - Explain carbon emissions
                    - Give energy saving suggestions
                    - Summarize environmental reports

                    Give simple, clear answers suitable for a hackathon demo.
                    `
                },

                {
                    role: "user",
                    content: userMessage
                }

            ]

        });


        res.json({

            reply: response.choices[0].message.content

        });


    } catch (error) {

        console.log("AI ERROR:", error);

        res.status(500).json({

            error: error.message

        });

    }

});


module.exports = router;