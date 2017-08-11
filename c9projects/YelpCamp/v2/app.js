var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite hill", 
//         image: "http://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg"
    
//     }, function(err, campground){
//     if(err){
//         console.log("ERROR...");
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND");
//         console.log(campground);
//     }
// });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
        if (err){
            console.log("ERROR");
        } else {
            res.render("campgrounds", {campgrounds: allcampgrounds});
        }
    })
    ;
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new") 
});

app.post("/campgrounds", function(req, res){
        // get data from form and add campgrounds to array
        var name = req.body.name;
        var image = req.body.image;
        var newCampground = {name: name, image: image};
        // Create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log("ERROR")
            } else {
                // redirect back to campgrounds page
                res.redirect("/campgrounds")
            }
        });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is online...");
});