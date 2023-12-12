const express = require('express');
const bodyParser = require("body-parser");
const {randomBytes} = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.post('/posts/:id/comments',(req,res) => {
  const id = randomBytes(4).toString('hex');
  const {body} = req.body;

  const comment = {id , body};

  const postId = req.params.id;

  const comments = commentsByPostId[postId];

  if(!comments){
    commentsByPostId[postId] = [comment];
  }else{
    commentsByPostId[postId] = [...comments,comment];
  }

  return res.status(201).send(comment);

});

app.get('/posts/:id/comments',(req,res) => {

  let comments = commentsByPostId[req.params.id];

  return res.send(comments);
});

app.listen(4001,() => {
  console.log("Comments service is running on http://localhost:4001");
})