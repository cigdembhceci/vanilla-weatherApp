function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    minutes = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
            <div class="col-2">
              <div class="weather-forecast-date">
             ${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="weather-forecast-temp-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8c378db8471f1cb632721fb78d722517";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}

function displaytemp(response) {
  fahrenheiTemp = response.data.main.temp;

  let tepmElement = document.querySelector("#temp");
  tepmElement.innerHTML = Math.round(fahrenheiTemp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descElement = document.querySelector("#description");
  descElement.innerHTML = response.data.weather[0].description;
  let humiElement = document.querySelector("#humidity");
  humiElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "8c378db8471f1cb632721fb78d722517";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displaytemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showCelsius(event) {
  event.preventDefault();
  celsuiusLink.classList.add("active");
  fahreLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  let celsiusTemp = ((fahrenheiTemp - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemp);
}

function showFahre(event) {
  fahreLink.classList.add("active");
  celsuiusLink.classList.remove("active");
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(fahrenheiTemp);
}
let fahrenheiTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsuiusLink = document.querySelector("#celsius-link");
celsuiusLink.addEventListener("click", showCelsius);

let fahreLink = document.querySelector("#fahre-link");
fahreLink.addEventListener("click", showFahre);

search("New York");
