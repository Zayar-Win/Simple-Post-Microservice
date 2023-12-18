const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events',async(req,res) => {

  const {type,data} = req.body;

  if(type === 'CommentCreated'){
    const status = data.body.includes('orange') ? 'rejected' : 'approved';

    try{
      await axios.post('http://localhost:4001/events',{
        type: 'CommentModerated',
        data : {
          postId : data.postId,
          id:data.id,
          body:data.body,
          status 
        }
      })
    }catch(e) {
      console.log(e.message);
    }
  }
  return res.send({});
})

app.listen(4003,() => {
  console.log('Server is running on http://localhost:4003');
})