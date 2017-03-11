const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const brand = req.params.brand;
  const url = `http://www.pbase.com/cameras/${brand}`;

  const dom = await axios.get(url);
  const $ = cheerio.load(dom.data);
  const items = [];

  $('tr').each(function(i, elem) {
    const length = $(this).find('td').length;

    if (length === 6) { // is item row
      const item = {
        thumb: $(this).find('td:first-child a img').attr('src') || null,
        name: $(this).find('td:nth-child(2) a span').text() || null,
        year: parseInt($(this).find('td:nth-child(3) span').text()) || null,
        mp: parseFloat($(this).find('td:nth-child(4) span').text()) || null,
        pictures: parseInt($(this).find('td:nth-child(5) span').text()) || null,
      };

      if (item.thumb) item.thumb = item.thumb.replace('/5/', '/3/');

      items.push(item);
    }
  });

  res.send(items);
};
