var express = require("express");
var router = express.Router();
var session = require ("express-session");
var db = require("../models");

// Homepage
router.get("/", (req,res) => {

    res.render("home")
})

// Search Page
router.get("/search", (req,res) => {
    res.render("search")
})


// LogIn/SignUp Page
router.get("/login", (req,res) => {
    res.render("log_in")
})


module.exports = router