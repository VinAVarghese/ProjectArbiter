var express = require("express");
var router = express.Router();
const axios = require("axios")

router.post("/api/tastedive" , (req,res) => {
    // Need to recieve type and q from frontend form
    
    const type = req.body.type;
    const q = req.body.q;
    
    const apiKey = "379591-Spontane-B984IDZT"
    const queryURL = `https://tastedive.com/api/similar?q=${type}:${q}&info=1&limit=100&k=${apiKey}`
    
    axios.get(queryURL).then((data) => {
        console.log(data);
        // Selecting 1 random option/100 responses to display
        const randomNum = Math.floor(Math.random() * 101);
        const option = data.similar.results[randomNum]
        // Need to send "option" data back to the frontend js to render
        res.json(option)
    })
})




