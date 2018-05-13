const axios = require('axios');

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
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'error fetching data' });
  }
};

module.exports = {
  helloWorld,
  fetchMarketData,
};
