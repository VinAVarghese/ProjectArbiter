var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var db = require("../models")


// Sign Up Button (on login/signup page) PASSED TESTING
router.post("/signup", (req,res) => {
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

// Login Button (on login/signup page) PASSED TESTING
router.post("/login", (req,res) => {
    db.User.findOne({
        where: {
            email:req.body.email
        }
    }).then(user=>{
        if(!user){
            return res.status(404).send("Account not found")
        } else {
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user = {
                    id:user.id,
                    name:user.name,
                    email:user.email
                }
                // res.status(200).send("Login successful");
                res.json(user)
            } else{
                res.status(401).send("Incorrect password"); 
            }
        }
    }).catch(err =>{
        return res.status(500).end()
    })
})

// Session Check PASSED TESTING 
router.get("/readsession",(req,res)=>{
    if(!req.session.user){
        res.send("Not logged in")
    } else {
        res.json(req.session.user)
    }
})


module.exports = router;