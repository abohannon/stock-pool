const { helloWorld, fetchMarketData } = require('../controller/stocksController.js');

module.exports = (app) => {
  app.get('/', helloWorld);
  app.post('/api/fetchMarketData', fetchMarketData);
};
