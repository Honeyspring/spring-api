const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

require('dotenv').config();
const DATABASE =process.env.DATABASE;
//connect databe mongoose to server
mongoose.connect(`${DATABASE}`)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
  //implemented CORS to make sure the front end could safely make calls to your app.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());//to extract the JSON object from the request
;

const bookRoutes = require('./routes/book'); //import route
const userRoutes = require('./routes/user');
/*This tells Express to serve up the static resource  images  
(a sub-directory of our base directory,  __dirname ) whenever it receives a request to the  /images  endpoint.*/
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/book', bookRoutes); //register  route
app.use('/api/auth', userRoutes);
module.exports = app;