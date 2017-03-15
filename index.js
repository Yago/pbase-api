const express = require('express');
const app  = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./app/routes')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} !`)
})
