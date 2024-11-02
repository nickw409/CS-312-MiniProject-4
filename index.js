import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var blogPosts = new Array();
var editPost = null;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   res.render("index.ejs", {blogPosts: blogPosts, editPost: editPost});
});

app.post("/create", (req, res) => { 
   var post = {
      name: req.body["name"],
      title: req.body["title"],
      postText: req.body["postText"],
      date: new Date().toLocaleString(),
   };
   blogPosts.push(post);
   console.log(`Name: ${post.name}\nTitle: ${post.title}\nPost Text: ${post.postText}\nDate: ${post.date}`);
   res.redirect("/");
});

app.post("/edit", (req, res) => {
   let title = req.body["edit"];
   console.log(`${title}`);
   blogPosts.forEach((post) => {
      if (post.title === title) {
         editPost = post;
      }
   });
   res.redirect("/");
});

app.post("/save", (req, res) => {
   var editedPost = {
      name: req.body["name"],
      title: req.body["title"],
      postText: req.body["postText"],
   };
   blogPosts.forEach((post) => {
      if (post.title === editedPost.title) {
         post.name = editedPost.name;
         post.title = editedPost.title;
         post.postText = editedPost.postText;
         editPost = null;
      }
   });
   res.redirect("/");
});

app.post("/delete", (req, res) => {
   let deletedTitle = req.body["delete"];
   for (var i = 0; i < blogPosts.length; i++) {
      if (blogPosts[i].title === deletedTitle) {
         blogPosts.splice(i, 1);
      }
   }
   res.redirect("/");
});

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});