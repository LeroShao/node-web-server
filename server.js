const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get(('/'),(req, res) => {
  res.render('home.hbs', {
    pageTitle: 'home page...',
    welcomeMessage: 'donuts. Welcome to my website',
    currentyear: new Date().getFullYear()
  });
});

app.get(('/about'), (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'about page...'
  });
});

app.get(('/bad'), (req, res) => {
  res.send({
    errorMes: 'Unable to load...'
  });
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
