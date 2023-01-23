// alert("hey");

function formatDay() {
  let currentTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[currentTime.getDay()];

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

  let currentMonth = months[currentTime.getMonth()];
  let currentDate = currentTime.getDate();
  let currentYear = currentTime.getFullYear();
  return `${currentDay} ${currentMonth} ${currentDate}, ${currentYear}`;
}

function formatDate() {
  let currentTime = new Date();
  let currentHours = currentTime.getHours();
  if (currentHours < 0) currentHours = `0${currentHours}`;
  let currentMins = currentTime.getMinutes();
  if (currentMins < 0) currentMins = `0${currentMins}`;
  return `Time: <i class="fa-regular fa-clock clock"> ${currentHours}:${currentMins}`;
}

let dayElement = document.querySelector("#day-month");
dayElement.innerHTML = formatDay();

let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatDate();

function displayWeather(response) {
  // console.log(response.data);
  let cityElement = document.querySelector("#city-name");
  let cityDisplayed = response.data.name;
  cityElement.innerHTML = cityDisplayed;

  //   To get name of city = console.log(response.data.name);

  //   let temperatureElememt = document.querySelector("#temp");
  //   let tempDisplayed = Math.round(response.data.main.temp);
  //   temperatureElememt.innerHTML = tempDisplayed;

  //   document.querySelector("#temp").innerHTML = Math.round(
  //     response.data.main.temp
  //   );

  let temperatureElement = document.querySelector("#temp");
  let tempDisplayed = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `Temperature: ${tempDisplayed}℃`;
  // console.log(tempDisplayed);
  // debugger;
  let windElement = document.querySelector("#wind");
  windDisplayed = response.data.wind.speed;
  windElement.innerHTML = `Wind: <i class="fa-solid fa-wind wind"></i>${windDisplayed} km/h`;
  //   console.log(response.data.wind.speed);

  weatherDescriptionElement = document.querySelector("#weather-description");
  descriptionDisplayed = response.data.weather[0].main;
  weatherDescriptionElement.innerHTML = `<i class="fa-solid fa-cloud cloud"> ${descriptionDisplayed}`;
  //   console.log(response.data.weather[0].main);
  let humidityElement = document.querySelector("#humidity");
  humidtyDisplayed = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidtyDisplayed}%`;
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function getCurrentWeatherdetails(position) {
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentWeatherdetails);
}

let currentLocationData = document.querySelector("#currentloc-btn");
currentLocationData.addEventListener("click", showCurrentPosition);

function getOntarioWeather(event) {
  event.preventDefault();
  let city = "ontario";
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getMadeiraWeather(event) {
  event.preventDefault();

  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=madeira&appid=${apiKey}&units=metric`;

  // `https://api.openweathermap.org/data/2.5/weather?q=madeira&appid=${apiKey}&units=metric`;
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

let madeiraWeather = document.querySelector("#madeira");
madeiraWeather.addEventListener("click", getMadeiraWeather);

let daresalamWeather = document.querySelector("#daresalam");
daresalamWeather.addEventListener("click", getDaresalamWeather);

// var str = new String("Demo Text");
// document.write(str.bold());
// alert(str.bold());
