const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts',(req,res) => {
  return res.send(posts);
})

app.post('/events',(req,res) => {
  const {type,data} = req.body;
  if(type === 'CommentCreated'){
    posts[data.postId].comments.push({id:data.id,body:data.body })
  }
  if(type === 'PostCreated'){
    posts[data.id] = {id : data.id,title:data.title,comments:[]}
  }
  return res.send({});

})

app.listen(4006,() => {
  console.log(`Server is listening on http://localhost:4006`);
})