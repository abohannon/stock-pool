const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const io = require('socket.io')();
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGODB_URI).then(
  () => console.log('MongoDB Connected!!$%&@!'),
  err => console.log('Error connecting to MongoDB', err),
);

const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });

io.listen(server);
console.log('Socket connected.');

io.on('connection', (client) => {
  console.log('Made socket connection', client.id);

  // Handle events
  client.on('updateStocks', (data) => {
    client.broadcast.emit('updateStocks', data);
  });
  client.on('setRange', (data) => {
    client.broadcast.emit('setRange', data);
  });
  client.on('fetchStockData', data => client.broadcast.emit('fetchStockData', data));
  client.on('removeStock', data => client.broadcast.emit('removeStock', data));
});
