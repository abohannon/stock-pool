const mongoose = require('mongoose');

const Pool = mongoose.model('pool');


const updateCurrentStocks = (data) => {
  Pool.findOne({ poolName: 'pool_1' }, (err, pool) => {
    if (err) throw err;

    if (!pool) {
      Pool.create({
        poolName: 'pool_1',
        currentStocks: [data],
      }, (createErr) => {
        if (createErr) throw createErr;
      });
    } else {
      Pool.updateOne(
        { poolName: 'pool_1' },
        { $addToSet: { currentStocks: data } },
      ).exec();
    }
  });
};

module.exports = {
  updateCurrentStocks,
};
