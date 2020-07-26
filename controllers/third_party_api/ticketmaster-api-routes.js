var express = require("express");
var router = express.Router();
const axios = require("axios");
var moment = require('moment');
require('dotenv').config();

router.post("/api/ticketmaster", (req, result) => {
    // Recieving city from frontend
    const city = req.body.city;

    const now = moment().format('YYYY-MM-DD');
    const startDate = now;
    const endDate = moment().add(3, "M").format('YYYY-MM-DD');

    const apiKey = process.env.TICKETMASTER_API_KEY;
    const queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=[${city}]&startDateTime=${startDate}T01:00:00Z&endDateTime=${endDate}T01:00:00Z&apikey=${apiKey}`

    axios.get(queryURL).then((res) => {
        console.log("res.data", res.data);
        const data = res.data._embedded.events
        // Selecting 1 random option/all responses to display
        const randomNum = Math.floor(Math.random() * data.length);
        const option = data[randomNum]
        console.log("option", option);
        // Send "option" data back to the frontend js to render
        result.json(option)
    })
})

module.exports = router


// TESTING

// const now = moment().format('YYYY-MM-DD');
// const startDate = now;
// const endDate = moment().add(3, "M").format('YYYY-MM-DD');

// const apiKey = process.env.TICKETMASTER_API_KEY;
// const queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=[seattle]&startDateTime=${startDate}T01:00:00Z&endDateTime=${endDate}T01:00:00Z&apikey=LsFM7ICoGCN8uTXLMR6CGoQ7BIPbyA7H`

// axios.get(queryURL).then((res) => {
//     console.log("res.data", res.data);
//     const data = res.data._embedded.events
//     // Selecting 1 random option/all responses to display
//     const randomNum = Math.floor(Math.random() * data.length);
//     const option = data[randomNum]
//     console.log("option", option);
//     // Send "option" data back to the frontend js to render
// })