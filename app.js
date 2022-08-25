const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('This always runs!');
  next();
});

app.use('/users', (req, res, next) => {
  res.json([{name: 'Slamet'}]);
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});


app.listen(3000);
