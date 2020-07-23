// Require
var express = require("express");
var router = express.Router();
var db = require("../models")
var Favorites = ('')


app.get("api/favorites", (req,res) => {
    db.Favorites.findAll({}).then(userData=>{
        res.json(userData)
    }).catch(err =>{
        console.log(err);
        res.status(500).end()
    })
})

app.post("api/favorites", (req,res) => {
    db.Favorites.create({
        title:req.body.title,
        note:req.body.note,
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        res.status(500).end()
    })
})

app.delete("api/favorites", (req,res) => {
    db.Favorites.destroy({}).then(userData=>{
        res.json(userData)
    }).catch(err =>{
        console.log(err);
        res.status(500).end()
    })
})

app.put("api/favorites/:id", (req,res) => {
    db.Favorites.update({

    }).then(userData=>{
        res.json(userData)
    }).catch(err =>{
        console.log(err);
        res.status(500).end()
    })
})

module.exports = router