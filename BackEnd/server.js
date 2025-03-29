require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

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

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
