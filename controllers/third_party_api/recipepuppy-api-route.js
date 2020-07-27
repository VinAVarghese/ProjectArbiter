var express = require("express");
var router = express.Router();
var zomato = require('zomato-api');
const axios = require("axios")
require('dotenv').config();

router.post("/api/recipepuppy", (req, result) => {
    //Need to recieve ingredients from frontend
    const ingredients = req.body.ingredients;

    const apiKey = process.env.RECIPEPUPPY_API_KEY;

    const queryURL = `http://www.recipepuppy.com/api/?i=${ingredients}&apikey=${apiKey}`

    axios.get(queryURL).then((res) => {
        const data = res.data.results
        // Selecting 1 random option/100 responses to display
        const randomNum = Math.floor(Math.random() * data.length);
        const option = res.data.results[randomNum]
        console.log("Backend option: ", option);
        // Need to send "option" data back to the frontend js to render
        result.send(option)

    }).catch((error) => {
        console.log(error)
    })
})

module.exports = router


// TESTING PASSED

// const queryURL = `http://www.recipepuppy.com/api/?i=chicken,brocolli&apikey=`

// axios.get(queryURL).then((res) => {
//     const data = res.data.results
//     // Selecting 1 random option/100 responses to display
//     const randomNum = Math.floor(Math.random() * data.length);
//     const option = res.data.results[randomNum]
//     console.log("Backend option: ", option);
//     // Need to send "option" data back to the frontend js to render
//     result.send(option)

// }).catch((error) => {
//     console.log(error)
// })