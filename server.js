//Require express package
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
//Create an instance of express packaged named "app"
const app = express()

const apiKey = 'dfe8e44803d55e29ce342297d2d92755';
//Grant express permission to access static public files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
//Set up template engine
app.set('view engine', 'ejs')

//We focus on the root URL "/"
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again 1'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again 2'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

//Create a server which listens on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})