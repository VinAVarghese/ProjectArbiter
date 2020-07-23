var express = require("express");
var router = express.Router();
const axios = require("axios")
require('dotenv').config();


router.post("/api/zomato" , (req,res) => {
    // Need to recieve type and q from frontend form
    
    const type = req.body.type;
    const q = req.body.q;
    
    const apiKey =  process.env.ZOMATO_API_KEY;
   // const queryURL = `https://zomato.com/api/similar?q=${type}:${q}&info=1&limit=100&k=${apiKey}`
   const queryURL = "https://developers.zomato.com/api/v2.1/categories"
    
    axios.get(queryURL).then(res => {
        console.log("res.data", res.data);
        // Selecting 1 random option/100 responses to display
        const randomNum = Math.floor(Math.random() * 101);
        const option = data.similar.results[randomNum]
        // Need to send "option" data back to the frontend js to render
        res.json(option)
    })
})