const mongoose = require('mongoose');

const Pool = mongoose.model('pool');

const updatePool = (data) => {
  const { stocks, range } = data;

  // TODO: Temp solution for demo
  const poolName = 'pool_1';

  Pool.findOne({ poolName }, (err, pool) => {
    if (err) throw err;

    if (!pool) {
      Pool.create({
        poolName,
        currentStocks: stocks,
        range,
      }, (createErr) => {
        if (createErr) throw createErr;
      });
    } else {
      Pool.updateOne(
        { poolName },
        {
          currentStocks: stocks,
          range,
        },
      ).exec();
    }
  });
};

module.exports = {
  updatePool,
};
