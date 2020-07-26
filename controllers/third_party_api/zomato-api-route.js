var express = require("express");
var router = express.Router();
var zomato = require('zomato-api');
const axios = require("axios")
require('dotenv').config();


router.post("/api/zomato", (req, result) => {
    // Recieving meal and city from frontend form
    const city = req.body.city;
    // const meal = req.body.meal; // Uncomment to add meal feature (when frontend ready)
    // "&categories=${meal}" // Add to second query

    const apiKey = process.env.ZOMATO_API_KEY;
    const queryURL = `https://developers.zomato.com/api/v2.1/cities?q=${city}&apikey=${apiKey}`

    axios.get(queryURL).then(res => {
        console.log("city ID: ", res.data.location_suggestions[0].id);
        var cityID = res.data.location_suggestions[0].id;
        var citySpecificURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&apikey=${apiKey}`
        axios.get(citySpecificURL).then(res => {
            const data = res.data.restaurants;
            // Selecting 1 random option/100 responses to display
            const randomNum = Math.floor(Math.random() * data.length);
            const option = data[randomNum].restaurant
            console.log("Server-sent option", option);
            // Need to send "option" data back to the frontend js to render
            result.send(option)
        })
    })
})

module.exports = router

// TESTING

// const apiKey = process.env.ZOMATO_API_KEY;
// const queryURL = `https://developers.zomato.com/api/v2.1/cities?q=seattle&apikey=e67072ffec13f1c95781c11c4b394576`

// axios.get(queryURL).then(res => {
//     console.log("city ID: ", res.data.location_suggestions[0].id);
//     var cityID = res.data.location_suggestions[0].id
//     var citySpecificURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&categories=dinner&apikey=e67072ffec13f1c95781c11c4b394576`
//     axios.get(citySpecificURL).then(res => {
//         // console.log("resturants", res.data.restaurants);
//         const data = res.data.restaurants;
//         // Selecting 1 random option / 100 responses to display
//         const randomNum = Math.floor(Math.random() * data.length);
//         const option = data[randomNum].restaurant
//         console.log("option", option);
//         // Need to send "option" data back to the frontend js to render
//     })
// })