var express = require("express");
var route = express.Router({mergeParams: true});
var Campground = require("../models/campground"),
    middelware = require("../middleware");

route.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

route.post("/", middelware.isLoggIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    var price = req.body.price;
    var new_camp = {name:name, image:image, description: des, price: price};
    Campground.create(new_camp, function(err, camp) {
        if (err) {
            console.log(err);
        }else{
            camp.author.id = req.user._id;
            camp.author.name = req.user.username;
            camp.save();
            console.log("add a new camp");
        }
    });
    res.redirect("/campgrounds");
});

route.get("/new",middelware.isLoggIn, function(req, res) {
    res.render("campgrounds/new");
});

route.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, findCamp){
        if (err) {
            console.log(err);
        }else{
            console.log(findCamp);
            res.render("campgrounds/show", {campground: findCamp});
        }
    });

});

route.get("/:id/edit", middelware.checkCampgroundOwnship, function(req, res) {
    Campground.findById(req.params.id, function(err, findCamp){
        if (err) {
                res.redirect('/campgrounds');
        }else{
                res.render("campgrounds/edit", {campground: findCamp});
        }
    });
});

route.put("/:id", middelware.checkCampgroundOwnship, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if (err) {
            res.redirect("/campgrounds");
        }else{
            console.log("change saved");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

route.delete('/:id', middelware.checkCampgroundOwnship, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = route;