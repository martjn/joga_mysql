const con = require("../utils/db");

const getArticleByAuthor = (req, res) => {
  let query = `SELECT * from article as a, author as b WHERE a.author_id=${req.params.idx} and a.author_id=b.id;`;
  let query2 = `SELECT * from author where id=${req.params.idx};`;
  con.query(query, (err, articles) => {
    if (err) throw err;
    con.query(query2, (err, authors) => {
      if (err) throw err;
      res.render("author", {
        articles: articles,
        authors: authors,
      });
    });
  });
};

// export controller functions
module.exports = {
  getArticleByAuthor
};
