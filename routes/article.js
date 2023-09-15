const express = require("express");

const router = express.Router();

const articleController = require("../controllers/article");

router.get("/", articleController.getAllArticles);
router.get("/article/create", articleController.showNewArticleForm);
router.get("/article/:slug", articleController.getArticleBySlug);

router.post("/create", articleController.createNewArticle);

module.exports = router;
