const axios = require('axios');
const util = require('util');

const helloWorld = (req, res) => {
  res.send({
    data: 'Hello World!',
  });
};

const fetchMarketData = async (req, res) => {
  const {
    symbol,
  } = req.body;

  const endpoint = `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart&range=1m`;

  try {
    const response = await axios.get(endpoint);
    res.json(response.data);
    console.log('success');
  } catch (error) {
    console.log('error');
    if (error) throw error;
  }
};

module.exports = {
  helloWorld,
  fetchMarketData,
};
