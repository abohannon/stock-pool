const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGODB_URI).then(
  () => console.log('MongoDB Connected!!$%&@'),
  err => console.log('Error connecting to MongoDB', err),
);

const app = express();
app.use(bodyParser.json());
routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });

module.exports = app;
