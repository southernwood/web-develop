var express = require("express");
var route = express.Router();

var  User = require("../models/user"),
     passport = require("passport");

route.get("/", function(req, res) {
    res.render("landing");
});



route.get("/register", function(req, res) {
    console.log("sing up....");
    res.render("register");
});

route.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            req.flash("error", err.message);
            res.redirect("/register");
            return;
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelp-camp " + user.username);
            res.redirect('/campgrounds');
    });
    });
});


route.get("/login", function(req, res) {
    res.render("login");
});

route.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

route.get('/logout', function(req, res) {
    req.logout();
    console.log("user logout");
    res.redirect('/campgrounds');
});

module.exports = route;