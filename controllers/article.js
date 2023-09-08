const con = require('../utils/db');

// show articles - index page
const getAllArticles = (req, res) => {
  let query = "SELECT * FROM article";
  let articles = [];
  con.query(query, (err, result) => {
    if (err) throw err;
    articles = result;
    res.render("index", {
      articles: articles,
    });
  });

}
// show article by slug
const getArticleBySlug = (req, res) => {
  let query = `SELECT * from article, author WHERE slug="${req.params.slug}" and author.id=article.author_id;`;
  let article;
  con.query(query, (err, result) => {
    if (err) throw err;
    article = result;
    res.render("article", {
      article: article,
    });
  });

}

// export controller functions
module.exports = {
  getAllArticles,
  getArticleBySlug
};