function currentTemp(response) {
  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let description = document.querySelector("#description")
  description.innerHTML =  response.data.condition.description;
  let iconElement = document.querySelector("#current-temperature-icon");
  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" />`;

  currentDateElement.innerHTML = formatDate(currentDate);
  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`  
  
  weatherSearch(response.data.city);
}
function currentForecastSearch(cityElement){
  let apiKey = "ofcac418875te3bf1b730443c52c6dfa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  
  currentForecastSearch(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function forecastDate(daystamps){
  let date = new Date(daystamps*1000);
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

 return forecastFormattedDay = days[date.getDay()];
}

function weatherSearch(cityElement){
  let apiKey = "ofcac418875te3bf1b730443c52c6dfa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityElement}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherForecast);
}

function weatherForecast(response){
 let forecastHtml = "";


    response.data.daily.forEach (function(forecastFormattedDay) {
        forecastHtml= 
          forecastHtml +  `<div class="weather-forecast" id="weather-forecast">
<p class="days-of-the-week" id ="days-of-the-week"> ${forecastDate(forecastFormattedDay.time)} <div = "forecast-images"> <img src = "${forecastFormattedDay.condition.icon_url}"/></div><div class="forecast-temp"> ${Math.round(forecastFormattedDay.temperature.maximum)} °/${Math.round(forecastFormattedDay.temperature.minimum)} °</p>
</div>`;
    });

let forecastElements = document.querySelector("#weather-forecast")
forecastElements.innerHTML = forecastHtml;

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

currentForecastSearch("Gqeberha");









