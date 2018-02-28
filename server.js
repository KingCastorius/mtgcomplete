const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const router = express.Router();
app.use(bodyParser.json());
require('./models/user');
require('./config/passport');
require('./models/card');
const users = require('./api/users')
const cards = require('./api/cards')
mongoose.connect('mongodb://ryan:123@ds151917.mlab.com:51917/dolphins').then(() => {
  console.log('db connected');
})

app.use(passport.initialize());

app.get('/', (req, res) => {
  res.end();
})

app.use('/users', users);
app.use('/cards', cards);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('server connected');
});