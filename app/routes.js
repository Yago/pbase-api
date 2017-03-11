const brands = require('./brands');
const items = require('./items');

module.exports = (app) => {
  app.get('/items/:brand', items);
  app.get('/brands', brands);
};
