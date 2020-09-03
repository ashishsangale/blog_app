
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override')
    expressSanitizer = require('express-sanitizer');
    db = require('./model/schema');

mongoose.connect("mongodb://localhost/blogapp", {
    useNewUrlParser: true, useUnifiedTopology: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//Routes
app.get('/', function(req, res){
    res.redirect("/blogs")
});

//INDEX Route
app.get("/blogs", function(req,res){
    db.find({}, function(err, blogs){
        if(err){
            console.log(err)
        } else {
            res.render("index", {blogs:blogs});
        }
    })
});

//NEW ROUTE
app.get("/blogs/new", function(req,res){
    res.render("new");
});

//CREATE route
app.post("/blogs", function(req,res){
    //creating blog
    req.body.blog.body = req.sanitize(req.body.blog.body)
    db.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('new')
        } else {
            //redirecting
            res.redirect('/blogs')
        } 
    });

});

//show Route
app.get("/blogs/:id", function(req, res){
    db.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//edit route
app.get("/blogs/:id/edit", function(req, res){
    db.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
    
});

//Update route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    db.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id); 
        }
    })
})

//Delete route
app.delete("/blogs/:id", function(req, res){
    //destroy blog
    db.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs")
        }
    })
    
});

app.listen(3000, process.env.IP, function(){
    console.log("started");
})