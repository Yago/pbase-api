const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const brand = req.params.brand;
  const type = req.params.type;
  const url = `http://www.pbase.com/cameras/${brand}`;

  const dom = await axios.get(url);
  const $ = cheerio.load(dom.data);
  let current = '';
  const items = {
    film_cameras: [],
    digital_cameras: [],
    lenses: [],
    film: [],
    digital_back: [],
    video_cameras: [],
    other: [],
  };

  $('tr').each(function(i, elem) {
    const length = $(this).find('td').length;

    // Check current category
    if (length === 1) {
      const currentTitle = $(this).find('td').text();
      current = currentTitle ? currentTitle.toLowerCase().replace(' ', '_') : current;
    }

    // Push item in right category
    if (length === 6) { // is item row
      const item = {
        id: `${brand}_${i}`,
        thumb: $(this).find('td:first-child a img').attr('src') || null,
        name: $(this).find('td:nth-child(2) a span').text() || null,
        year: parseInt($(this).find('td:nth-child(3) span').text()) || null,
        pictures: parseInt($(this).find('td:nth-child(5) span').text()) || null,
      };

      // Add extra MegaPixels attribute
      if (current === 'digital_cameras') item.mp = parseFloat($(this).find('td:nth-child(4) span').text()) || null;

      // Add extra focal length and aperture attribute
      if (current === 'lenses') {
        const lengthMM = item.name ? item.name.match(/(\d+)(\-)?(\.)?(\d+)?(mm|\smm|\sf)/g) : null;
        const lengthCM = item.name ? item.name.match(/(\d+)?(\.)?(\d+)(\-)?(\.)?(\d+)?(\.)?(\d+)?(cm|\scm|\sf)/g) : null;
        const aperture = item.name ? item.name.match(/(f\/|f|mmF|\sF)(\d+)(\.)?(\d+)?(\-)?(\d+)?(\.)?(\d+)?/g) : null;

        if (lengthMM) item.focal = lengthMM.join().replace('mm', '').replace(' f', '');
        if (lengthCM && !lengthMM) item.focal = lengthCM.join().replace('cm', '').split('-').map(length => length * 10).join('-');
        if (aperture) item.aperture = aperture.join().replace('f/', '').replace('f', '').replace('mmF', '').replace(' F', '');
      }

      // Add extra asa attribute
      if (current === 'film') {
        const asa = item.name.match(/(\d+)/g);
        if (asa) item.asa = asa.join();
      }

      items[current].push(item);
    }
  });

  items.film_cameras.sort((a,b) => b.year - a.year);
  items.digital_cameras.sort((a,b) => b.year - a.year);
  items.lenses.sort((a,b) => b.year - a.year);

  res.send(items[type]);
};
