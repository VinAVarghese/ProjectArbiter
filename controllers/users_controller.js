var express = require("express");
var router = express.Router();
var db = require("../models")
var User = ('')

app.get("api/user/:id", (req,res) => {
    db.User.findOne({
        where: {
            id:req.params.id
        },
    }).then(userData=>{
        res.json(userData)
    }).catch(err =>{
        console.log(err);
        res.status(500).end()
    })
})

app.get("api/user/withfavorites/:id", (req,res) => {
    db.User.findOne({
        where: {
            id:req.params.id
        },
        include:[db.Favorite]
    }).then(userData=>{
        res.json(userData)
    }).catch(err =>{
        console.log(err);
        res.status(500).end()
    })
})

app.post("api/user", (req,res) => {
    db.User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        res.status(500).end()
    })
})

app.delete("api/user", (req,res) => {
    db.User.destroy({}).then(userData=>{
        res.json(userData)
    }).catch(err =>{
        console.log(err);
        res.status(500).end()
    })
})

app.put("api/user/:id", (req,res) => {
    db.User.update({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }).then(userData=>{
        res.json(userData)
    }).catch(err =>{
        console.log(err);
        res.status(500).end()
    })
})

module.exports = router

