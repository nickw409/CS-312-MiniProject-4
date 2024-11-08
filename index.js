import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;
var blogPosts = new Array({
   id:1,
   username:"nick",
   title:"test",
   postText:"Test post text",
   date: new Date().toLocaleString()
});
var users = new Array();
var editPost = null;
app.use(express.static("public"));

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
   res.render("index.ejs", {blogPosts: blogPosts, editPost: editPost});
});

app.post("/create", (req, res) => { 
   var post = {
      id: blogPosts.length + 1,
      username: req.body["username"],
      title: req.body["title"],
      postText: req.body["postText"],
      date: new Date().toLocaleString(),
   };
   blogPosts.push(post);
   console.log(`Name: ${post.name}\nTitle: ${post.title}\nPost Text: ${post.postText}\nDate: ${post.date}`);
   res.json({"message":"Post created"});
});

app.post("/edit", (req, res) => {
   let title = req.body["edit"];
   console.log(`${title}`);
   blogPosts.forEach((post) => {
      if (post.title === title) {
         editPost = post;
      }
   });
   res.send(200);
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
   res.sendStatus(200);
});

app.post("/delete", (req, res) => {
   console.log(req.body);
   let deletedTitle = req.body["title"];
   let username = req.body["username"];
   for (var i = 0; i < blogPosts.length; i++) {
      if (blogPosts[i].title === deletedTitle) {
         if (blogPosts[i].username === username) {
            blogPosts.splice(i, 1);
         }
      }
   }
   console.log(`Deleted post, posts: ${blogPosts}`);
   res.json({"message":"Post deleted"});
});

app.get("/posts", (req, res) => {
   res.json(blogPosts);
})

app.post("/signin", (req, res) => {
   console.log(req.body);
   let found = false;
   let name = req.body["username"];
   let pass = req.body["password"];
   users.forEach((user) => {
      if (user.username === name && user.password === pass) {
         found = true;
         res.json({"message":"User found"});
      }
   })
   if (!found) {
      res.status(404).json({"message":"User not found"});
   }
});

app.post("/signup", (req, res) => {
   //res.set('Access-Control-Allow-Origin', '*');
   let name = req.body["username"];
   let pass = req.body["password"];
   var user = {
      username: name,
      password: pass
   };
   users.push(user);
   console.log(`Username: ${user.username}\nPassword: ${user.password}\n`);
   res.json({"message":"User created"});
});

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});