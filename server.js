
const express = require('express'); // usar la libreria
const app = express(); // Inicializar Servidor
const port = 3000; // puerto que voy a usar

// importar middlewares
// const morgan = require('./middlewares/morgan');
const manage404 = require('./middlewares/manage404');
const auth_api_key = require('./middlewares/auth_api_key');

// express
app.use(express.json());

app.use(express.static('public'));

// Logger
// app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Motor EJS para plantilla
app.set('view engine', 'ejs');

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const request = require('request');

require('dotenv').config();
const API_KEY = process.env.API_KEY;
console.log("API_KEY=", API_KEY);

app.get('/', function (req, res) {
	//res.send('Hello World!');
	res.render('index');
})

app.post('/', function (req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
  
	
	request(url, function (err, response, body) {
	  if(err){
		res.render('index', {weather: null, error: 'Error, please try again'});
	  } else {
		let weather = JSON.parse(body)
		if(weather.main == undefined){
		  res.render('index', {weather: null, error: 'Error, please try again'});
		} else {
		  let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
		  res.render('index', {weather: weatherText, error: null});
		  console.log(weatherText)
		}
	  }
	});
  })

// Para todo el resto de rutas no contempladas
app.use('*', manage404);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});
