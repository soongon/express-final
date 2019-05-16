var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:1234@cluster0-vu1ky.mongodb.net/test?retryWrites=true";

/* /articles 전체보기  */
router.get('/', (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  let result = null;
  client.connect()
      .then((client) => {
        const collection = client.db("test").collection("articles");
        const cursor = collection.find();
        return cursor;
      })
      .then((cursor) => {
        result = cursor;

      })
      .catch((err) => {

      });

  res.json(result);
});

/* /articles/:id 상세보기  */
router.get('/:articleNum', (req, res) => {
  const articleNumber = req.params.articleNum;
  res.send(articleNumber + ' 번글 보기');
});

/* /articles 등록  */
router.post('/', (req, res) => {
  const articleJsonFromClient = req.body;

  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("test").collection("articles");
    collection.insertOne(articleJsonFromClient);
    client.close();
  });
  res.json(articleJsonFromClient);
});

/* /articles/:id 수정  */
router.put('/:articleNum', (req, res) => {
  const articleNumber = req.params.articleNum;
  const jsonFromClient = req.body;

  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("test").collection("articles");
    collection.updateOne(
        { _id: parseInt(articleNumber) },
        {
          $set: jsonFromClient
        }
    );
    client.close();
  });
  res.send(articleNumber + ' 번 글 수정');
});

/* /articles/:id 삭제  */
router.delete('/:articleNum', (req, res) => {
  const articleNumber = parseInt(req.params.articleNum);
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("test").collection("articles");
    collection.deleteOne({_id: articleNumber});
    client.close();
  });
  res.send(articleNumber + ' 번 글 삭제');
});


module.exports = router;
