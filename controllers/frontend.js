var express = require("express");
var router = express.Router();
var db = require("../models")

// Homepage
app.get("/", (req,res) => {
    res.render("index")
})

// Login Page
app.get("/login", (req,res) => {
    res.render("login")
})

// Favorites Page
app.get("/favorites", (req,res) => {
    res.render("favorites")
})

// User Page
app.get("/user/:id", (req,res) => {
    db.User.findOne({
        where:{
            id:req.params.id
        },
        include:[db.Favorites]
    }).then(userData => {
        res.render("user", userJSON)
    })
})

module.exports = router