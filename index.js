import axios from 'axios';
import cheerio from 'cheerio';

const url = 'http://www.pbase.com/cameras/nikon';

// fetch(url)
//   .then(res => res.text());
//   .then(body => {
//     const $ = cheerio.load(body);
//
//     $('tr').each(function(i, elem) {
//       console.log($(this).text());
//     });
//   });

const scraper = async () => {
  const dom = await axios.get(url);
  const $ = cheerio.load(dom.data);
  const nikons = [];

  $('tr').each(function(i, elem) {
    const length = $(this).find('td').length;
    if (length === 6) { // is item row
      const nikon = {
        thumb: $(this).find('td:first-child a img').attr('src') || null,
        name: $(this).find('td:nth-child(2) a span').text() || null,
        year: parseInt($(this).find('td:nth-child(3) span').text()) || null,
        mp: parseFloat($(this).find('td:nth-child(4) span').text()) || null,
        pictures: parseInt($(this).find('td:nth-child(5) span').text()) || null,
      };

      if (nikon.thumb) nikon.thumb = nikon.thumb.replace('/5/', '/3/');

      nikons.push(nikon);
    }
  });

  console.log(nikons);
};

scraper();
