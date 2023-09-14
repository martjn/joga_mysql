const Article = require('../models/article.model.js');

// show articles - index page
const getAllArticles = (req, res) => {
  Article.getAll((err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || "Some error occurred retrieving articles data"
      })
    }
    else{
      console.log(data)
      res.render("index", {
        articles: data
      })
    }
  })
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