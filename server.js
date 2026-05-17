const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the Groq Neural Link
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// TITAN's Core Directive
const systemPrompt = `You are T.I.T.A.N. (Tactical Intelligence and Task Automation Network). You are a highly advanced, efficient, and formal AI assistant operating on the C.O.R.E. OS. Keep your answers concise, highly technical, and devoid of unnecessary emotion, but strictly loyal and helpful to your Operator. Respond directly without prefacing your answers.`;

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            // Using LLaMA 3 for lightning-fast voice responses
            model: 'llama3-8b-8192', 
        });

        const reply = chatCompletion.choices[0].message.content;
        res.json({ reply: reply });
    } catch (error) {
        console.error("Core Processing Error:", error);
        res.status(500).json({ reply: "System error. Neural link severed. Please check API integrity." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TITAN C.O.R.E. Engine active on port ${PORT}`);
});
