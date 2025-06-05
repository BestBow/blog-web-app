import express from 'express';
import bodyParser from "body-parser";

const app = express();
const PORT =  3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { blogPosts: posts });
  });  

app.post("/post", (req, res) => {
    const newPost = {
      title: req.body.title,
      content: req.body.content
    };
    posts.push(newPost); 
    res.redirect("/");
  });

  app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts[postId];
    if (post) {
      res.render("edit-form.ejs", { post, id: postId });
    } else {
      res.status(404).send("Post not found");
    }
  });

  app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    if (posts[postId]) {
      posts[postId].title = req.body.title;
      posts[postId].content = req.body.content;
    }
    res.redirect("/");
  });

  app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    if (posts[postId]) {
        posts.splice(postId, 1);
    }
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});