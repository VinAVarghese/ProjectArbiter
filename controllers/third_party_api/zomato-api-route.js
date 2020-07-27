var express = require("express");
var router = express.Router();
var zomato = require('zomato-api');
const axios = require("axios")
require('dotenv').config();


router.post("/api/zomato", (req, result) => {
    // Recieving meal and city from frontend form
    const city = req.body.city;
    const estId = req.body.estId;
    var citySpecificURL;
    

    const apiKey = process.env.ZOMATO_API_KEY;
    const queryURL = `https://developers.zomato.com/api/v2.1/cities?q=${city}&apikey=${apiKey}`

    axios.get(queryURL).then(res => {
        console.log("city ID: ", res.data.location_suggestions[0].id);
        var cityID = res.data.location_suggestions[0].id;
        
        if(estId !== "Resturant"){
            citySpecificURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&establishment_type=${estId}&apikey=${apiKey}`
        } else{
            citySpecificURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&apikey=${apiKey}`
        }

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

// TESTING PASSED

// const apiKey = process.env.ZOMATO_API_KEY;
// const queryURL = `https://developers.zomato.com/api/v2.1/cities?q=seattle&apikey=`

// axios.get(queryURL).then(res => {
//     console.log("city ID: ", res.data.location_suggestions[0].id);
//     var cityID = res.data.location_suggestions[0].id
//     var citySpecificURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&categories=dinner&apikey=`
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