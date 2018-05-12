const mongoose = require('mongoose');

const { Schema } = mongoose;

const stocksSchema = new Schema({
  symbol: { type: String, required: true },
});

mongoose.model('stocks', stocksSchema);
