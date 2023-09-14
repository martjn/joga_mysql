// db connection
const con = require("../utils/db")

// constructor
const Article = (article) => {
  this.name = article.name
  this.slug = article.slug
  this.image = article.image
  this.body = article.body
  this.published = article.published
  this.author_id = article.author_id
}

// get all articles
Article.getAll = (result) => {
  let query = "Select * from article";
  let articles = []
  con.query(query, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null)
      return;
    }
    articles = res
    console.log("articles: ", articles);
    result(null, articles);
  })
}

Article.getBySlug = (slug, result) => {
  let query = `SELECT * from article, author WHERE slug="${req.params.slug}" and author.id=article.author_id;`
  let article
  con.query(query, (err, res) => {
    if(err){
      console.log("error: ", err)
      result(err, null)
      return;
    }
    if(res.length){
      console.log("found article: ", res[0]);
      result(null, res[0])
    }
  })
}

module.exports = Article;