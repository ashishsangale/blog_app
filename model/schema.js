var mongoose = require('mongoose');

//Schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

// model config
var Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;