var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "http://www.visitnc.com/contents/imgcrop/60726/1200/630/preview"},
        {name: "Granite hill", image: "http://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg"},
        {name: "The Infamous", image: "https://www.decathlon.co.uk/ecuk/static/wedze/assets/img/camping/camping-background.jpg"},
        {name: "Salmon Creek", image: "http://www.visitnc.com/contents/imgcrop/60726/1200/630/preview"},
        {name: "Granite hill", image: "http://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg"},
        {name: "The Infamous", image: "https://www.decathlon.co.uk/ecuk/static/wedze/assets/img/camping/camping-background.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new") 
});

app.post("/campgrounds", function(req, res){
        // get data from form and add campgrounds to array
        var name = req.body.name;
        var image = req.body.image;
        var newCampground = {name: name, image: image};
        campgrounds.push(newCampground);
        //rediret back to campgrounds page
        res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is online...");
});