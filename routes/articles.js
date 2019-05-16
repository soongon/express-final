var express = require('express');
var router = express.Router();

const Article = require('../schemas/article');

/* /articles 전체보기  */
router.get('/', async (req, res, next) => {

  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/* /articles/:id 상세보기  */
router.get('/:articleNum', async (req, res, next) => {
  const articleNumber = parseInt(req.params.articleNum);

  try {
    const article = await Article.find({_id: articleNumber});
    res.send(article);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/* /articles 등록  */
router.post('/', async (req, res, next) => {
  const articleJsonFromClient = req.body;

  try {
    const article = new Article(articleJsonFromClient);
    const saved = await article.save();

    res.json(saved);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

/* /articles/:id 수정  */
router.put('/:articleNum', async (req, res, next) => {
  const articleNumber = parseInt(req.params.articleNum);
  const jsonFromClient = req.body;

  try {
    const modified = await Article.updateOne({_id: articleNumber}, jsonFromClient);
    res.send(modified);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

/* /articles/:id 삭제  */
router.delete('/:articleNum', async (req, res, next) => {
  const articleNumber = parseInt(req.params.articleNum);

  try {
    const deleted = await Article.deleteOne({_id: articleNumber});
    res.send(deleted);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});


module.exports = router;
