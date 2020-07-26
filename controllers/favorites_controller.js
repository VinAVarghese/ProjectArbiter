var express = require("express");
var router = express.Router();
var db = require("../models")

// Favorites Page > Read all on load
router.get("/", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    }
    db.Favorites.findAll({
        include: [db.User]
    }).then(favs => {
        const favsJSON = favs.map((favsObj) => {
            return favsObj.toJSON();
        })
        res.render("favorites", { favorites: favsJSON })
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

// Add Favorite (favorite button next to returned option in search page)
router.post("/api/notes", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    }
    db.Favorites.create({
        title: req.body.title,
        note: "",
    }).then(favoriteData => {
        res.json(favoriteData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

// Delete Favorite Button (on favorites page)
router.delete("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
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

// Single View/Fav Edit Page
router.get("/:id", (req, res) => {
    db.Favorites.findOne({
        where: {
            id: req.params.id
        }
    }).then(favs => {
        const favsJSON = favs.map((favsObj) => {
            return favsObj.toJSON();
        })
        res.render("favorite_edit", { favorites: favsJSON })
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

// Update Button (on single view page)
router.put("/:id", (req, res) => {
    db.Favorites.update({
        title: req.body.title,
        note: req.body.note,
    }, {
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