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

const mysql = require("mysql2");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ij6lS*H?ScwD",
  database: "joga_mysql",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to joga_mysql db");
});

app.get("/", (req, res) => {
  let query = "SELECT * FROM article";
  let articles = [];
  con.query(query, (err, result) => {
    if (err) throw err;
    articles = result;
    res.render("index", {
      articles: articles,
    });
  });
});

app.get("/article/:slug", (req, res) => {
  let query = `SELECT * from article, author WHERE slug="${req.params.slug}" and author.id=article.author_id;`;
  let article;
  con.query(query, (err, result) => {
    if (err) throw err;
    article = result;
    res.render("article", {
      article: article,
    });
  });
});
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
