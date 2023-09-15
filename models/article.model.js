// db connection
const con = require("../utils/db");

// constructor
const Article = function (article) {
  this.name = article.name;
  this.slug = article.slug;
  this.image = article.image;
  this.body = article.body;
  this.published = article.published;
  this.author_id = article.author_id;
};

// get all articles
Article.getAll = (result) => {
  let query = "Select * from article";
  let articles = [];
  con.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    articles = res;
    console.log("articles: ", articles);
    result(null, articles);
  });
};

Article.getBySlug = (slug, result) => {
  let query = `SELECT * from article, author WHERE slug="${slug}" and author.id=article.author_id;`;
  let article;
  con.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found article: ", res[0]);
      result(null, res[0]);
      return;
    }
  });
};

Article.createNew = (newArticle, result) => {
  let query = `insert into article set
  name = "${newArticle.name}",
  slug = "${newArticle.slug}",
  image = "${newArticle.image}",
  body = "${newArticle.body}",
  published = "${newArticle.published}",
  author_id = "${newArticle.author_id}"`;

  con.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created article: ", { id: res.insertId, ...newArticle });
    result(null, { id: res.insertId, ...newArticle });
  });
};

Article.getById = (id, result) => {
  let query = `SELECT * from article WHERE id="${id}"`;
  con.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found article: ", res[0]);
      result(null, res[0]);
      return;
    }
  });
};

Article.updateById = (articleId, updatedArticle, result) => {
  let query = `
    UPDATE article
    SET 
      name = "${updatedArticle.name}", 
      slug = "${updatedArticle.slug}", 
      image = "${updatedArticle.image}", 
      body = "${updatedArticle.body}", 
      published = "${updatedArticle.published}", 
      author_id = "${updatedArticle.author_id}"
    WHERE id = ${articleId}
  `;

  con.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // no article with the specified ID was found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated article: ", { id: articleId, ...updatedArticle });
    result(null, { id: articleId, ...updatedArticle });
  });
};

module.exports = Article;
