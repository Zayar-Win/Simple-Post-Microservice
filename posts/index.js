const express = require('express');
const {randomBytes}  = require('crypto');
const bodyParser = require('body-parser');
const cors  = require('cors');
const app = express();
const axios = require('axios');

app.use(bodyParser.json())
app.use(cors());
const posts = {};

app.post('/events',(req,res) => {
  console.log('Post Created Event');
  res.send({});
})

app.post('/posts',async(req,res) => {
  const id = randomBytes(4).toString('hex');
  const {title} = req.body;
  posts[id] = {id,title};
  try{
    await axios.post('http://localhost:4004/events',{
      type: 'PostCreated',
      data:{
        id,title
      }
    })

  }catch(e){
    console.log(e.message);
  }
  return res.status(201).send(posts[id]);
});

app.get('/posts',(req,res) => {
  return res.send(posts);
});

app.listen(4000,() => {
  console.log(`Server is runnig on http://localhost:4000`);
})