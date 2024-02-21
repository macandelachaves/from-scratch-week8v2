function refreshWeather(response) {
  let weatherTemperature = document.querySelector("#main-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidityDescription = document.querySelector("#humidity");
  let windDescription = document.querySelector("#wind");
  let currentTime = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  console.log(response.data);

  cityElement.innerHTML = response.data.city;
  currentTime.innerHTML = formatDate(date);
  weatherDescription.innerHTML = response.data.condition.description;
  humidityDescription.innerHTML = `${response.data.temperature.humidity}%`;
  windDescription.innerHTML = `${response.data.wind.speed}km/h`;
  weatherTemperature.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class="main-emoji"/>`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "36bb04605e1o2a2f7ce6c8t6fa5fe0ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "36bb04605e1o2a2f7ce6c8t6fa5fe0ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5)
      forecastHtml =
        forecastHtml +
        `
      <div class ="forecast-day">        
      <div class="forecast-weather-date"> ${formatDay(day.time)} </div>
     <img src = "${day.condition.icon_url}" class="forecast-weather-emoji"/>
              <div class="forecast-weather-temperatures">
                <span> ${Math.round(day.temperature.maximum)}°</span>
                <span> ${Math.round(day.temperature.minimum)}°</span>
            </div>
            </div>
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Buenos Aires");
displayForecast();
