const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const brand = req.params.brand;
  const url = `http://www.pbase.com/cameras/`;

  const dom = await axios.get(url);
  const $ = cheerio.load(dom.data);
  const brands = [];

  $('td').each(function(i, elem) {
    const brandUrl = $(this).find('a').attr('href');
    const brand = brandUrl ? brandUrl.replace('/cameras/', '') : null;

    if (brand && brand.indexOf('/') === -1) {
      brands.push(brand);
    }
  });

  const response = brands
    .sort((a, b) => {
      if(a < b) return -1;
      if(a > b) return 1;
     return 0;
    })
    .reduce((acc, value) => {
      if (acc.indexOf(value) === -1) {
        acc.push(value);
      }
      return acc;
    }, []);

  res.send(response);
};
