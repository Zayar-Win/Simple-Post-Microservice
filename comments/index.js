const express = require('express');
const bodyParser = require("body-parser");
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.post('/posts/:id/comments',async (req,res) => {
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

  await axios.post('http://localhost:4004/events',{
    type:'CommentCreated',
    data : {
      id,body,postId
    }
  })

  return res.status(201).send(comment);

});

app.get('/posts/:id/comments',(req,res) => {

  let comments = commentsByPostId[req.params.id];

  return res.send(comments || []);
});

app.post('/events',(req,res) => {
  console.log('Comment Created Event');
  res.send({});
})

app.listen(4001,() => {
  console.log("Comments service is running on http://localhost:4001");
})