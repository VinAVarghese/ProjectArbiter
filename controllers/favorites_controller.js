var express = require("express");
var router = express.Router();
var db = require("../models")

// Favorites Page > Read all on load PASSED TESTING
router.get("/", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    }
    db.Favorite.findAll({
        include: [db.User]
    }).then(favs => {
        const favsJSON = favs.map((favsObj) => {
            return favsObj.toJSON();
        })
        res.render("favorites", { favorite: favsJSON })
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

// Add Favorite (favorite button in search page) PASSED TESTING
router.post("/", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    }
    db.Favorite.create({
        title: req.body.title,
        note: "",
        UserId: req.session.user.id
    }).then(favoriteData => {
        res.json(favoriteData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

// Delete Favorite Button (on favorites page) PASSED TESTING
router.delete("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    } else {
        db.Favorite.destroy({
            where: {
                id: req.params.id
            }
        }).then(favoriteData => {
            res.send("Deleted")
        }).catch(err => {
            console.log(err);
            res.status(500).end()
        })
    }
})

// Single View/Fav Edit Page PASSED TESTING
router.get("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    }
    db.Favorite.findOne({
        where: {
            id: req.params.id
        }
    }).then(favs => {
        const favsJSON = favs.toJSON();
        console.log(favsJSON);
        res.render("favorite_edit", favsJSON)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

// Edit Button (on single view page)
router.put("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Please login first.")
    }
    db.Favorite.update({
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