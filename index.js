const express = require('express');
const app  = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./app/routes')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} !`)
})
