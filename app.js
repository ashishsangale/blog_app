var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


mongoose.connect("mongodb://localhost/blogapp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

// model config
var Blog = mongoose.model("Blog", blogSchema);


//Routes
app.get('/', function(req, res){
    res.redirect("/blogs")
});

app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err)
        } else {
            res.render("index", {blogs:blogs});
        }
    })
});


app.listen(3000, process.env.IP, function(){
    console.log("started");
})