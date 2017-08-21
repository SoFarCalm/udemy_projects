var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    methodOverride   = require("method-override");
    
//APP-CONFIG   
mongoose.connect("mongodb://localhost/photo_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//MONGOOSE/MODEL/CONFIG
var photoSchema = new mongoose.Schema({
    caption: String,
    image: String
});

var Photo = mongoose.model("Photo", photoSchema);

// Photo.create({
//     image: "https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/05/04-3.jpg",
//     caption: "Vacation Photo"
// });

//RESTful ROUTES

//INDEX
app.get("/", function(req, res){
    res.redirect("/photos");
});

app.get("/photos", function(req, res){
    Photo.find({}, function(err, photos){
        if(err){
            console.log("error");
        } else {
            res.render("index", {photos: photos});
        }
    });
});


//NEW
app.get("/photos/new", function(req, res) {
    res.render("new");
});

//CREATE
app.post("/photos", function(req, res){
    Photo.create(req.body.photo, function(err, newPhoto){
        if(err){
            res.render("/new");
        } else {
            res.redirect("/photos");
        }     
    });
});

//SHOW
app.get("/photos/:id", function(req, res) {
   Photo.findById(req.params.id, function(err, foundPhoto){
       if(err){
           res.redirect("/photos");
       } else {
           res.render("show", {photo: foundPhoto});
       }
   });
});

//EDIT
app.get("/photos/:id/edit", function(req, res) {
    Photo.findById(req.params.id, function(err, foundPhoto){
        if (err){
            res.redirect("/photos");
        } else {
            res.render("edit", {photo: foundPhoto});
        }
    });
});

//UPDATE
app.put("/photos/:id", function(req, res){
    Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
        if(err){
            res.redirect("/photos");
        } else{
            res.redirect("/photos/" + req.params.id);
        }
    });
});

//DELETE
app.delete("/photos/:id", function(req, res){
    Photo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/photos");
        } else {
            res.redirect("/photos");
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Online...");
});