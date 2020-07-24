var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const session = require ("express-session");

// Login Page (Sign Up route)
router.post("/signup", (req,res) => {
    db.User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }).then(userData=>{
        res.json(userData.id)
    }).catch(err=>{
        console.log(err);
        res.status(500).end()
    })
})

// Login Page (Login route)
router.post("/login", (req,res) => {
    db.User.findOne({
        where: {
            email:req.params.email
        }
    }).then(user=>{
        if(!user){
            return res.status(404).send("User not found")
        } else {
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user = {
                    id:user.id,
                    name:user.name,
                    email:user.email
                }
                res.send("Login successful!");
            } else{
                res.status(401).send("Incorrect password"); 
            }
        }
    }).catch(err =>{
        return res.status(500).end()
    })
})

router.get("/readsessions",(req,res)=>{
    res.json(req.session)
})

router.get("/secretroute",(req,res)=>{
    if(req.session.user){
        res.send(`Welcome`)
    } else {
        res.status(401).send("Please login first.")
    }
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out!");
})

module.exports = router;