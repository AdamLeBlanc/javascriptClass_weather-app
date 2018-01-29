/* 
  Author: Adam LeBlanc
  Licence: MIT

  This is a basic weather app to teach students a bit of javascript.
*/

/* 
  The first thing we need to do is create an IIFE.

  This is a function that will run as soon as our script is loaded and keep
  everything inside it's own scope.This avoid adding things to the global namespace.

  we put this function in strict mode to get better debug things.
*/
(function() {
  "use strict";
  // You will need your own api key that you can get by making an account at openweathermap.org
  // It is generally bad to include it in your source code, but for this example it's fine
  const API_KEY = "<your key here>";
  // This is the route of the API. This is the website we will ask for JSON from
  // To get the weather
  const BASE_URL = "https://api.openweathermap.org/data/2.5";
  // The url to get the current weather.
  // notice that we use the backtick character here. This is called a template string
  // it let's us put variables into the string to be expanded with the ${variable} syntax
  // everything after the question mark '?' in the string is what's called a query param
  // this is the extra info the api will use to give us what we need. Query params are
  // separated with & signs, so we can have multiple
  const WEATHER_URL = `${BASE_URL}/weather?APPID=${API_KEY}`;

  // we make an app object to hold useful state, such as the selected city.
  // We will also put a few functions on app.
  const app = {
    selectedCity: "Charlottetown",
    card: document.querySelector(".cardTemplate"),
    units: "metric"
  };

  // This function will do work in the background, so we add async to it.
  // it fetches the weather and returns the results as json
  app.fetchCurrentWeather = async () => {
    // here will build the url for the weather. q=city tells the api what city we want
    // and units=metric tells it what units we want back
    const url = `${WEATHER_URL}&q=${app.selectedCity}&units=${app.units}`;
    // get the results then turn the response into json.s
    const results = await fetch(url);
    return await results.json();
  };

  app.updateWeather = async () => {
    // Grab the current weather from the function we made earlier
    const weather = await app.fetchCurrentWeather();
    // alias the card we need to fill in
    const card = app.card;
    card.querySelector(".location").textContent = weather.name;
    card.querySelector(".date").textContent = createDate(weather.dt);
    card.querySelector(".description").textContent =
      weather.weather[0].description;
    const current = card.querySelector(".current");
    current.querySelector(".visual > .icon").classList = "icon cloudy";
    current.querySelector(".visual > .temperature > .value ").textContent =
      weather.main.temp;
    current.querySelector(".description > .humidity").textContent = `${
      weather.main.humidity
    } %`;
    current.querySelector(".description > .wind > .value").textContent =
      weather.wind.speed;
    current.querySelector(".description > .wind > .direction").textContent = `${
      weather.wind.deg
    }`;
    current.querySelector(".sunrise").textContent = createDate(
      weather.sys.sunrise
    );
    current.querySelector(".sunset").textContent = createDate(
      weather.sys.sunset
    );
  };

  function createDate(timeInSeconds) {
    return new Date(timeInSeconds * 1000);
  }

  app.updateWeather();
})();
