var express = require("express");
var app = express();
var mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    expressSession = require("express-session");
    
mongoose.connect("mongodb://localhost/auth_demo");

app.set("view engine", "ejs");

app.use(expressSession({
    secret: "what ever",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLogin, function(req, res){
    res.render("secret");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.redirect("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect('/secret');
            });
        }
    });
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});


app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/')
})

function isLogin(req, res, next) {
    if (req.isAuthenticated()){
        console.log("permit")
        return next();
    }
    console.log("permission deny")
    res.redirect('/login');
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("authentication demo server started.......");
})