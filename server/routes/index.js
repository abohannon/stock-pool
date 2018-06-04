const { helloWorld } = require('../controller/stocksController.js');

module.exports = (app) => {
  app.get('/', helloWorld);
};
