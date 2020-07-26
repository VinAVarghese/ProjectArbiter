var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

// Sign Up Button (on sign up page)
router.post("/signup", (req,res) => {
    db.User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }).then(userData=>{
        res.json(userData.id)
        res.redirect("/user/:id")
    }).catch(err=>{
        console.log(err);
        res.status(500).end()
    })
})

// Login Button (on login page)
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
                res.send("Login successful!");
            } else{
                res.status(401).send("Incorrect password"); 
            }
        }
    }).catch(err =>{
        return res.status(500).end()
    })
})

// Logout Button (on user page)
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("You have been logged out!");
})

router.get("/readsessions",(req,res)=>{
    res.json(req.session.user)
})

router.get("/secretroute",(req,res)=>{
    if(req.session.user){
        res.send(`Welcome`)
    } else {
        res.status(401).send("Please login first.")
    }
})


module.exports = router;