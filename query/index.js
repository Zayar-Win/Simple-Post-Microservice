const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts',(req,res) => {
  return res.send(posts);
})

const processEvent = (type,data) => {
  if(type === 'CommentCreated'){
    posts[data.postId].comments.push({id:data.id,body:data.body ,status:data.status})
  }
  if(type === 'PostCreated'){
    posts[data.id] = {id : data.id,title:data.title,comments:[]}
  }
  if(type === 'CommentUpdated'){
    const post = posts[data.postId];
    const comment = post.comments.find(comment => comment.id === data.id);
    comment.status = data.status;
    comment.body = data.body;
  }
}

app.post('/events',(req,res) => {
  const {type,data} = req.body;
  processEvent(type,data);
  return res.send({});

})

app.listen(4006,async() => {
  console.log(`Server is listening on http://localhost:4006`);
  try{
    const res = await axios.get('http://localhost:4004/events');
    const events = res.data;
    for(let event of events){
      processEvent(event.type,event.data)
      console.log('Processed ',event.type);
    }
  }catch(e){
    console.log(e.message);
  }
})