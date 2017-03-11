# 📷 PBase - scrape API

> [pabase.com](http://www.pbase.com/cameras) have a great database of digital/film cameras and lenses. This just transform it static content into a simple json API

## Install

````bash
$ yarn install
or
$ npm install
````

and just `node index.js` to run the server

## Routes

###`/brands`

Return an array of ordered brands

````json
[
  "acro_scientific",
  "adox",
  "agat",
  "agfa",
  "aiptek",
  "alpa",
  "amazon",
  "american",
  "..."
]
````

###`/:brand/:type`

> f.ex. `/nikon/lenses`

Return an array of brand related item type (`film_cameras`, `digital_cameras`, `lenses`, `film`, `digital_back` or `video_cameras`).

````json
[
  {
    "thumb": "http://m3.i.pbase.com/g9/87/331787/5/163450323.lWlw0cKH.jpg",
    "name": "Nikon AF-S NIKKOR 600mm f/4E FL ED VR ",
    "year": 2016,
    "pictures": 275,
    "focal": "600",
    "aperture": "4"
  },
  {
    "thumb": "http://m4.i.pbase.com/g9/87/331787/5/161829354.85gMZvMA.jpg",
    "name": "AF-S NIKKOR 200-500mm f/5.6E ED VR",
    "year": 2015,
    "pictures": 1819,
    "focal": "200-500",
    "aperture": "5.6"
  }
]
````
