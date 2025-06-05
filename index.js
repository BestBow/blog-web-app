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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});