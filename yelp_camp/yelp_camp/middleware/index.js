var Campground = require("../models/campground"),
    Comment = require("../models/comment");

var middlewareObj = {
    isLoggIn: function(req, res, next) {
        if (req.isAuthenticated()){
            console.log("permit");
            return next();
        }
        req.flash("error", "You need to be login to do that");
        res.redirect('/login');
    },
    checkCampgroundOwnship: function (req, res, next) {
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, findCamp){
                if (err) {
                    res.flash("error", "Campground not found");
                    res.redirect('back');
                }else{
                    if (findCamp.author.id.equals(req.user.id)){
                    next();
                    }else{
                        
                        res.flash("error", "you don't have the permission to do that");
                        res.redirect('back');
                    }
                }
            });
        }else{
            req.flash("error", "You need to be login to do that");
            res.redirect('back');
        }
    },
    
    checkCommentOwnship: function (req, res, next) {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, findComment){
                if (err) {
                res.flash("error", "Comment not found");
                res.redirect('back');
                }else{
                    if (findComment.author.id.equals(req.user.id)){
                        next();
                    }else{
                        req.flash("error", "you don't have the permission to do that");
                        res.redirect('back');
                    }
                }
            });
        }else{
            req.flash("error", "You need to be login to do that");
            res.redirect('back');
        }
    }
}

module.exports = middlewareObj;




