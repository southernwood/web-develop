//import the packages
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    LocalStrategy  = require("passport-local"),
    expressSession = require("express-session"),
    methodOverride = require("method-override"),
    flashMessage = require("connect-flash");
    
    
    
//connect the database
mongoose.connect("mongodb://localhost/yelp_camp");

//initialize the models
var User = require("./models/user");
    

// initialize the application

app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));  //set home directory 
app.use(methodOverride("_method"));
app.use(flashMessage());

//passport configuration
app.use(expressSession({
    secret: "what ever",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass global variables to every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

//test data
//seedDB();

// ===================
// ROUTES
// ===================
var campRoute = require("./routes/campgrounds"),
    commentsRoute = require("./routes/comments"),
    indexRoute = require("./routes/index");

app.use('/campgrounds',campRoute);
app.use('/campgrounds/:id/comments',commentsRoute);
app.use(indexRoute);

//start the server
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server started");
});