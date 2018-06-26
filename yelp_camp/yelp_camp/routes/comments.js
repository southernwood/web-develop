var express = require("express");
var route = express.Router({mergeParams: true});
var Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middelware = require("../middleware");

//create
route.get("/new",middelware.isLoggIn, function(req, res) {
    Campground.findById(req.params.id, function(err, findCamp){
        if (err) {
            console.log(err);
        }else{
            res.render('comments/new', {campground: findCamp});
        }
    });
});

route.post("/", middelware.isLoggIn, function(req, res){
    Campground.findById(req.params.id, function(err, findCamp) {
        if(err) {
            console.log(err);
            console.log("can't find the campground");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                    console.log("cannot create the comment");
                }else{
                    console.log("create the comment");
                    comment.author.id = req.user._id;
                    comment.author.name = req.user.username;
                    comment.save();
                    findCamp.comments.push(comment);
                    findCamp.save();
                    req.flash("success", "successfully added a comment");
                    res.redirect("/campgrounds/" + findCamp._id);
                }
            });
        }
    });
});

// update
route.get("/:comment_id/edit", middelware.checkCommentOwnship, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, findComment){
        if (err) {
            console.log("cannot find the comment");
            res.redirect('back');
        }else{
            console.log(findComment);
            res.render("comments/edit", {comment: findComment, campground_id: req.params.id});
        }
    });
});


route.put("/:comment_id", middelware.checkCommentOwnship, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        }else{
            req.flash("success", "change saved");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//destroy
route.delete('/:comment_id', middelware.checkCommentOwnship, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            res.redirect("/campgrounds/" + req.params.id);
        }else{
            res.flash("success", "comment deleted")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = route;