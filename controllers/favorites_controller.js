// Require
var express = require("express");
var router = express.Router();
const session = require("express-session");
var db = require("../models")
var Favorites = ('')


app.get("/", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    }
    db.Favorites.findAll({}).then(favoriteData => {
        res.json(favoriteData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

app.post("/", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    }
    db.Favorites.create({
        title: req.body.title,
        note: req.body.note,
    }).then(favoriteData => {
        res.json(favoriteData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

app.delete("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    } else {
        db.Favorites.findOne({
            where: {
                id: req.params.id
            }
        }).then(fav => {
            if (req.session.user.id !== fav.Userid) {
                return res.status(401).send("Not your favorite.")
            } else {
                db.Favorites.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(favoriteData => {
                    res.json(favoriteData)
                }).catch(err => {
                    console.log(err);
                    res.status(500).end()
                })
            }
        })
    }

})

app.put("/:id", (req, res) => {
    db.Favorites.update({
        where: {
            id: req.params.id
        }
    }).then(favoriteData => {
        res.json(favoriteData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

module.exports = router