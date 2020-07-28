var express = require("express");
var router = express.Router();
var db = require("../models")

// User Page > Read user data on load // PASSED TESTING
router.get("/user/:id", (req, res) => {
    if (req.session.user) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(userObj => {
            const userObjJSON = userObj.toJSON();
            res.render("user", userObjJSON)
        }).catch(err => {
            console.log(err);
            res.status(500).end()
        })
    }
})

// Update User Button (on user page) PASSED TESTING
router.put("/user/:id", (req, res) => {
    if (!req.session.user) {
        res.render("notauth")
    }
    db.User.update({
        email: req.body.email,
    }, {
        where: {
            id: req.params.id
        }
    }).then(userData => {
        res.json("Email Updated")
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })

})

// Logout Button (on user page) PASSED TESTING
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("You have been logged out!");
})

// Delete Account Button (on user page) PASSED TESTING
router.delete("/user/:id", (req, res) => {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(userData => {
        res.json(userData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

module.exports = router

