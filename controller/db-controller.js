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

const fetchPool = (req, res) => {
  const { poolName } = req.query;

  Pool.findOne({ poolName }, (err, pool) => {
    if (err) throw err;

    if (!pool) {
      console.log('No pool found');
      res.status(404).send({
        error: 'No pool found',
      });
    } else {
      const payload = {
        currentStocks: pool.currentStocks,
        range: pool.range,
      };

      res.status(200).send(payload);
    }
  });
};

module.exports = {
  updatePool,
  fetchPool,
};
