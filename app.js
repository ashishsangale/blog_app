
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override')
    expressSanitizer = require('express-sanitizer');
    db = require('./model/schema');
    routes = require('./routes/route');

mongoose.connect("mongodb://localhost/blogapp", {
    useNewUrlParser: true, useUnifiedTopology: true
});
app.use('/', routes)
app.set("view engine", "ejs");
app.use(express.static("public"));

//Routes
app.get('/', function(req, res){
    res.redirect("/blogs")
});

app.listen(3000, process.env.IP, function(){
    console.log("started");
})