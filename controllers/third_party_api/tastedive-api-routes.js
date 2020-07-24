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
        const data = res.data.Similar.Results
        // Selecting 1 random option/100 responses to display
        const randomNum = Math.floor(Math.random() * data.length);
        const option = res.data.Similar.Results[randomNum]
        console.log("option", option);
        // Sending "option" data back to the frontend js to render
        res.json(option)
    })
})

module.exports = router

// TESTING

// const queryURL = `https://tastedive.com/api/similar?q=movie:matrix&info=1&limit=100&k=379591-Spontane-B984IDZT`

// axios.get(queryURL).then((res) => {
//     console.log("res.data", res.data); //why is this coming back as "object"
//     const data = res.data.Similar.Results
//     // Selecting 1 random option/100 responses to display
//     const randomNum = Math.floor(Math.random() * data.length);
//     const option = res.data.Similar.Results[randomNum]
//     console.log("option", option);
//     // Sending "option" data back to the frontend js to render
//     res.json(option)
// })