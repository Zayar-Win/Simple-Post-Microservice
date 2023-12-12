const express = require('express');
const {randomBytes}  = require('crypto');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const posts = {};

app.post('/posts',(req,res) => {
  const id = randomBytes(4).toString('hex');
  const {title} = req.body;
  posts[id] = {id,title};
  return res.status(201).send(posts[id]);
});

app.get('/posts',(req,res) => {
  return res.send(posts);
});

app.listen(4000,() => {
  console.log(`Server is runnig on http://localhost:4000`);
})