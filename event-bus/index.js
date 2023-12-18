const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req,res) => {
  const event = req.body;
   axios.post('http://localhost:4000/events',event).catch(e => {
    console.log(e.message);
  })
   axios.post('http://localhost:4001/events',event).catch(e => {
    console.log(e.message);
  })
   axios.post('http://localhost:4006/events',event).catch(e => {
    console.log(e.message);
  })
  res.status(200);
})

app.listen(4004,() => {
  console.log('Server is listening on http://localhost:4004');
})