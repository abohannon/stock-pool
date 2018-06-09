const mongoose = require('mongoose');

const { Schema } = mongoose;

const poolSchema = new Schema({
  poolName: { type: String },
  data: Schema.Types.Mixed,
  currentStocks: { type: Array },
  range: { type: String },
});

mongoose.model('pool', poolSchema);
