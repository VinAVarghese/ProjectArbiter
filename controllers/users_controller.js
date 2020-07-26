var express = require("express");
var router = express.Router();
var db = require("../models")

// User Page > Read user data on load
router.get("/user/:id", (req,res) => {
    if(req.session.user){
        db.User.findOne({
            where:{
                id:req.params.id
            }
        }).then(userObj => {
            const userObjJSON = userObj.toJSON();
            res.render("user", userObjJSON)
        }).catch(err =>{
            console.log(err);
            res.status(500).end()
        })
    }
})

// Update User Button (on user page)
router.put("/user/:id", (req,res) => {
    db.User.update({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    },{
        where:{
            id:req.params.id
        }
    }).then(userData=>{
        res.json(userData)
    }).catch(err =>{
        console.log(err);
        res.status(500).end()
    })
})

// Delete Account Button (on user page)
router.delete("/user/:id", (req,res) => {
    db.User.destroy({
        where:{
            id:req.params.id
        }
    }).then(userData=>{
        res.json(userData)
    }).catch(err =>{
        console.log(err);
        res.status(500).end()
    })
})

module.exports = router

