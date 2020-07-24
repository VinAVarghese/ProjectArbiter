var express = require("express");
var router = express.Router();
var session = require ("express-session");
var db = require("../models");
const user = require("../models/user");

// Homepage
router.get("/", (req,res) => {
    res.render("index")
})

// Login Page
router.get("/login", (req,res) => {
    res.render("login")
})

// Sign Up Page
router.get("/signup", (req,res) => {
    res.render("signup")
})

// User Page
router.get("/user/:id", (req,res) => {
    if(!req.session.user)
    db.User.findOne({
        where:{
            id:req.params.id
        },
        include:[db.Favorites]
    }).then(userObj => {
        const userObjJSON = userObj.toJSON();
        res.render("user", userObjJSON)
    })
})

// Search Page
router.get("/search", (req,res) => {
    res.render("search")
})

// Favorites Page
router.get("/favorites", (req,res) => {
    res.render("favorites")
})


module.exports = router