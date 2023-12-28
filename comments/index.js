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
      id,body,postId,
      status:'pending'
    }
  })


  return res.status(201).send(comment);

});

app.get('/posts/:id/comments',(req,res) => {

  let comments = commentsByPostId[req.params.id];

  return res.send(comments || []);
});

app.post('/events',async(req,res) => {
  console.log('Comment Created Event');
  const {type,data} = req.body;
  if(type === 'CommentModerated'){
    try{  
      const comments = commentsByPostId[data.postId];
      const comment = comments.find(comment => comment.id === data.id);
      comment.status = data.status;
      comment.body = data.body;
      await axios.post('http://localhost:4004/events',{
        type : 'CommentUpdated',
        data:{
          id:data.id,
          body:data.body,
          postId : data.postId,
          status : data.status
        }
      })
    }catch(e) {
      console.log(e.message);
    }
  }
  res.send({});
})

app.listen(4001,() => {
  console.log("Updated version of comment image");
  console.log("Update the image version that used by a deployment.");
  console.log("Comments service is running on http://localhost:4001");
})