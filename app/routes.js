const items = require('./items');

module.exports = (app) => {
  app.get('/items/:brand', items);
};
