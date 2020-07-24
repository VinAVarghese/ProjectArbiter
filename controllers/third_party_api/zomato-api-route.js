var express = require("express");
var router = express.Router();
const axios = require("axios")
require('dotenv').config();


router.post("/api/zomato" , (req,res) => {
    // Need to recieve category and city from frontend form
    
    const cateory = req.body.category;
    const city = req.body.city;
    
    const apiKey =  process.env.ZOMATO_API_KEY;
   // const queryURL = `https://zomato.com/api/similar?q=${type}:${q}&info=1&limit=100&k=${apiKey}`
   const queryURL = `https://developers.zomato.com/api/v2.1/cities?q=${city}&apikey=${apiKey}`
    
    axios.get(queryURL).then(res => {
        var cityID = res.response.location_suggestions[0].cityID
        var citySpecificURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&categories=${category}&apikey=${apiKey}`
        axios.get(citySpecificURL).then(res=>{
            console.log("res.restaurants", res.restaurants);
            // Selecting 1 random option/100 responses to display
            const randomNum = Math.floor(Math.random() * 101);
            
            // Do either of these
            
            // while(true) {
            //     axios.get(``);
            // }
            const option = res.restaurants[randomNum]
            //const option = res.restaurants.resturant[randomNum]
            
            // Need to send "option" data back to the frontend js to render
            res.json(option)
        })
    })
})