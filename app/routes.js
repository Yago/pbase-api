const brands = require('./brands');
const items = require('./items');

module.exports = (app) => {
  app.get('/:brand/:type', items);
  app.get('/brands', brands);
};
