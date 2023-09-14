const Article = require("../models/article.model.js");

// show articles - index page
const getAllArticles = (req, res) => {
  Article.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred retrieving articles data",
      });
    } else {
      console.log(data);
      res.render("index", {
        articles: data,
      });
    }
  });
};

// show article by slug
const getArticleBySlug = (req, res) => {
  Article.getBySlug =
    (req.params.slug,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occured retrieving article data",
        });
      } else {
        console.log(data);
        res.render("article", {
          article: data,
        });
      }
    });
};

// export controller functions
module.exports = {
  getAllArticles,
  getArticleBySlug,
};
