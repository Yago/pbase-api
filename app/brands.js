const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const brand = req.params.brand;
  const url = `http://www.pbase.com/cameras/`;

  const dom = await axios.get(url);
  const $ = cheerio.load(dom.data);
  const brands = [];

  $('td').not('.ma, .wb, .top').each(function(i, elem) {
    const brandUrl = $(this).find('a').attr('href');
    const brandSlug = brandUrl ? brandUrl.replace('/cameras/', '') : null;
    let brandName = brandSlug;

    if ($(this).find('b').text()) {
      brandName = $(this).find('b').text();
    } else if ($(this).find('span').text()) {
      brandName = $(this).find('span').text();
    } else if ($(this).find('a').text()) {
      brandName = $(this).find('a').text();
    }

    if (brandSlug && brandSlug.indexOf('/') === -1) {
      brands.push({
        slug: brandSlug,
        name: brandName,
      });
    }
  });

  const response = brands
    .sort((a, b) => {
      if(a.slug < b.slug) return -1;
      if(a.slug > b.slug) return 1;
     return 0;
    })
    .reduce((acc, value) => {
      if (!acc.find(item => item.slug === value.slug)) {
        acc.push(value);
      }
      return acc;
    }, []);

  res.send(response);
};
