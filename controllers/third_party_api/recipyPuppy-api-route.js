var express = require("express");
var router = express.Router();
var zomato = require('zomato-api');
const axios = require("axios")
require('dotenv').config();

router.post("/api/recipyPuppy" , (req, res) => {
    //Need to recieve data from frontend
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const page = req.body.page;

    const apiKey = process.env.RECIPYPUPPY_API_KEY;
    
    
    const queryURL =`http://www.recipepuppy.com/api/?i=${ingredients}&q=${title}&p=${page}&apikey=${apiKey}`

    axios.get(queryURL).then((res) => {
        console.log("res.results",res.results);
        // Selecting 1 random option/100 responses to display
        const randomNum = Math.floor(Math.random() * 101);
        const option = res.results[randomNum]
        console.log("option", option);
        // Need to send "option" data back to the frontend js to render
        res.json(option)

    }).catch((error)=>{
        console.log(error)
      })
})