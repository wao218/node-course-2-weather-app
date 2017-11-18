const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  var weatherUrl = `https://api.darksky.net/forecast/43095ca556bd4634c5bda4e9ea7cbbd7/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var summary = response.data.currently.summary;
  var dailySummary = response.data.daily.summary;
  var precipProbability = response.data.daily.data[0].precipProbability;
  var precipType = response.data.daily.data[0].precipType;
  console.log(`Current Temperature: ${temperature}`);
  console.log(`It feels like: ${apparentTemperature}`);
  console.log(`Currently: ${summary}`);
  console.log(`Current weather report: ${dailySummary}`);
  console.log(`Chance of precipitation: ${precipProbability}`);
  console.log(`Type of precipitation: ${precipType}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
