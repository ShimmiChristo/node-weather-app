const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '766c3c417174c33080eb3dac5f901807';

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
  res.render('index')
})

// app.post('/', function(req, res) {
//   res.render('index');
//   console.log(req.body.city);
// })


app.post('/', function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  
  request(url, function(err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'There was an error, try again.'});
    } else {
      let weather = JSON.parse(body);
      
      if(weather.main == undefined) {
        res.render('index', {weather: null, error: 'please try agagin'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})