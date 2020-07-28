var express = require("express");
var router = express.Router();
const axios = require("axios");
require('dotenv').config();

router.post("/api/tastedive" , (req,result) => {
    // Recieving type and q from frontend
    console.log("Requiring from front end: ", req.body);
    const type = req.body.type;
    const q = req.body.q;
    
    const apiKey = process.env.TASTEDIVE_API_KEY;
    const queryURL = `https://tastedive.com/api/similar?q=${type}:${q}&info=1&limit=30&k=${apiKey}`
    
    axios.get(queryURL).then((res) => {
        const data = res.data.Similar.Results;
        // Selecting 1 random option/30 responses to display
        const randomNum = Math.floor(Math.random() * data.length);
        const option = res.data.Similar.Results[randomNum]
        console.log("Server-side option: ", option);
        // Sending "option" data back to the frontend js to render
        result.send(option)
    })
})

module.exports = router

// TESTING PASSED

// let option;
// const apiKey = process.env.TASTEDIVE_API_KEY;
// const queryURL = `https://tastedive.com/api/similar?q=Movie:Harry%20Potter&info=1&limit=30&k=`

// axios.get(queryURL).then((res) => {
//     const data = res.data.Similar.Results
//     // console.log("Returned data: ", data);
//     // Selecting 1 random option/30 responses to display
//     const randomNum = Math.floor(Math.random() * data.length);
//     option = res.data.Similar.Results[randomNum]
//     console.log("Returned option: ", option);
//     // Sending "option" data back to the frontend js to render
// })
// // res.json(option)