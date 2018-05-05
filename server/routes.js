const axios = require('axios');
const keys = require('./config/keys');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ data: 'Hello World!' });
  });

  app.post('/api/fetchMarketData', (req, res) => {
    const { timeSeries, symbol } = req.body;
    const endpoint = 'https://www.alphavantage.co/query';

    const config = {
      params: {
        function: timeSeries,
        symbol,
        apikey: keys.AA_API_KEY,
      },
    };

    axios.get(endpoint, config)
      .then(response => res.json({ message: 'success', data: response.data }))
      .catch(err => res.json({ message: 'failed to fetch market data', error: err }));
  });
};

