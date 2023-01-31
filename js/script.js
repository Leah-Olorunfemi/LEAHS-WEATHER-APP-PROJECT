// alert("hey");

// Thursday January 16th, 2022 03:12
function formatDay() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  // console.log(day);

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  // console.log(date);
  let year = currentDate.getFullYear();
  return `${day} ${month} ${date},${year}`;
}

let dateDisplayed = document.querySelector("#day-info");
dateDisplayed.innerHTML = formatDay();

function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 0) {
    hours = `0${hours}`;
  }
  let mins = currentDate.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return `${hours}:${mins}`;
}

// let timeShown = document.querySelector("#time");
// timeShown.innerHTML = formatDate();

function displayWeather(response) {
  // console.log(response.data);

  let citySearched = document.querySelector("#city-searched");
  let temperatureShown = document.querySelector("#temperature");
  let tempDisplayed = Math.round(response.data.main.temp);
  let humidityShown = document.querySelector("#humidity");
  let windShown = document.querySelector("#wind");
  let weatherconditionShown = document.querySelector("#weather-condition");
  let timeShown = document.querySelector("#time");

  citySearched.innerHTML = response.data.name;
  temperatureShown.innerHTML = tempDisplayed;
  humidityShown.innerHTML = response.data.main.humidity;
  windShown.innerHTML = Math.round(response.data.wind.speed);
  weatherconditionShown.innerHTML = response.data.weather[0].description;
  timeShown.innerHTML = formatDate(response.data.dt * 1000);
  // console.log(response.data.dt);
  celsiusTemperature = response.data.main.temp;

  // console.log(response.data.weather[0].icon);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecastDay() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row fifth-row">`;
  let days = ["Wednesday", "Thursday", "Friday", "Saturday"];
  days.forEach(function (day) {
    forecastHTML = forecastHTML + `<div class="col-3">${day}</div>`;

    forecastElement.innerHTML = forecastHTML;
  });
}

function search(city) {
  // event.preventDefault();
  // let city = document.querySelector("#city-input").value;
  let apiKey = "eae061c95483dd066657bfc7525418ed";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#city-input");
  search(citySearched.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

function displayCeltemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  // let celsiusTemp = document.querySelector("#celLink");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celLink = document.querySelector("#celLink");
celLink.addEventListener("click", displayCeltemp);

function displayFarhtemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let farhtemp = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farhtemp);
}

let farLink = document.querySelector("#farhLink");
farLink.addEventListener("click", displayFarhtemp);

function getCurrentLocationData(position) {
  console.log(position.coords.latitude);
  let apiKey = "eae061c95483dd066657bfc7525418ed";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocationData);
}

let currentLocationButton = document.querySelector("#current-locationbtn");
currentLocationButton.addEventListener("click", showPosition);

// SCRIPTS FOR CITIES I HOPE TO VISIT SOME DAY BELOW.

function getOntarioWeather(event) {
  event.preventDefault();
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=ontario&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getLucerneWeather(event) {
  event.preventDefault();
  let city = "lucerne";
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getMadeiraWeather(event) {
  event.preventDefault();
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=madeira&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getDaresalamWeather(event) {
  event.preventDefault();
  let city = "dar es salaam";
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let ontarioWeather = document.querySelector("#ontario");
ontarioWeather.addEventListener("click", getOntarioWeather);

let LucerneWeather = document.querySelector("#lucerne");
LucerneWeather.addEventListener("click", getLucerneWeather);

let madeiraWeather = document.querySelector("#madeira");
madeiraWeather.addEventListener("click", getMadeiraWeather);

let daresalamWeather = document.querySelector("#daresalam");
daresalamWeather.addEventListener("click", getDaresalamWeather);

displayForecastDay();
search("Texas");
