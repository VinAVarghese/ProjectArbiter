var express = require("express");
var router = express.Router();
const axios = require("axios");
require('dotenv').config();

router.post("/api/tastedive" , (req,res) => {
    // Recieving type and q from frontend
    const type = req.body.type;
    const q = req.body.q;
    
    const apiKey = process.env.TASTEDIVE_API_KEY;
    const queryURL = `https://tastedive.com/api/similar?q=${type}:${q}&info=1&limit=100&k=${apiKey}`
    
    axios.get(queryURL).then((res) => {
        console.log("res.data", res.data);
        // Selecting 1 random option/100 responses to display
        const randomNum = Math.floor(Math.random() * 101);
        const option = res.data.similar.results[randomNum]
        console.log("option", option);
        // Need to send "option" data back to the frontend js to render
        res.json(option)
    })
})

module.exports = router