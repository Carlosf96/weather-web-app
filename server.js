const express = require('express');
const app = express();
const port = 1337;
const bodyParser = require('body-parser');
const request = require('request')
const argv = require('yargs').argv
let apiKey = 'API_KEY';
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index', {weather:null, error:null}));

app.listen(port, () => console.log(`MyWeather app listening on port ${port}!`));

app.post('/', (req, res, ) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function (err, response, body) {
    if (err) {
      res.render('index:', {weather: null, error: 'error try again later.'});
    } else {
      let weather = JSON.parse(body);
      //console.log(weather);
      if (weather.main == undefined) res.render('index', { weather: null, error: 'error please try again later' });
      else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', { weather: weatherText, error: null });
        //console.log(message);
      }
    }
  });
  
  //console.log(req.body.city);
});

