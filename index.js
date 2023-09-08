const express = require("express");
const app = express();

const path = require("path");
const hbs = require("express-handlebars");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
  })
);

app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const articleRoutes = require('./routes/article');

app.use('/', articleRoutes);
app.use('/article', articleRoutes);

app.get("/author/:idx", (req, res) => {
  let query = `SELECT * from article as a, author as b WHERE a.author_id=${req.params.idx} and a.author_id=b.id;`;
  let query2 = `SELECT * from author where id=${req.params.idx};`;
  let articles = [];
  let authors = [];
  con.query(query, (err, articles) => {
    if (err) throw err;
    con.query(query2, (err, authors) => {
      if(err) throw err;
      res.render("author", {
        articles: articles,
        authors: authors
      })
    })
  });
});

// app start
app.listen(3000, () => {
  console.log("App is started at http://localhost:3000");
});
