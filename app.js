
const express = require("express");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "This is a blog website anyone can write a blog in it";
const aboutContent = "About page of my blog";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// mongodb connection
mongoose.connect("mongodb+srv://admin-abhinav:Blog100@cluster0.zsiol.mongodb.net/blogDB");
const postSchema = {
  title: String,
  content: String
 };

const Post = mongoose.model("Post", postSchema);




app.get("/", function(req, res) {
//  console.log(posts);
Post.find({}, function(err, posts){

  res.render("home", {homeStartingContent: homeStartingContent, showPosts: posts });
});
});

app.get("/about", function(req, res) {
 
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
 
  res.render("contact", {contactContent: contactContent });
});

app.get("/compose", function(req, res) {
 
  res.render("compose");
});

app.post("/compose", function(req, res) {

  const post = new Post ({
    title: req.body.inputTitle,
    content: req.body.inputPost
  });

  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
 // res.redirect("/");
});

app.get("/posts/:postId", function(req, res) {
  var requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
 
      title: post.title,
 
      content: post.content
 
    });
 
  });
 
 
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
