require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

// Your existing Google Search API keys
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

// Your n8n webhook URL
const N8N_WEBHOOK_URL = 'https://solan.app.n8n.cloud/webhook-test/d3fd6642-2665-42ea-bbad-182ac0e49db2';

// Original Google search endpoint
app.get("/search", async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ error: "Query is required" });
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)} manufacturing&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.items.map(item => ({
            title: item.title,
            snippet: item.snippet,
            link: item.link
        }));
        res.json(results);
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// New endpoint that uses your n8n AI agent
app.get("/search-vendors", async (req, res) => {
    const query = req.query.query;
    const category = req.query.category || 'all';
    
    if (!query) return res.status(400).json({ error: "Query is required" });
    
    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, category })
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching vendor results:", error);
        res.status(500).json({ error: "Failed to search for vendors" });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
