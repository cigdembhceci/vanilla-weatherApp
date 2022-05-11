function displaytemp(response) {
  console.log(response.data);
  let tepmElement = document.querySelector("#temp");
  tepmElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descElement = document.querySelector("#description");
  descElement.innerHTML = response.data.weather[0].description;
  let humiElement = document.querySelector("#humidity");
  humiElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "a70f9c31d69f5263e3e2bfe53953ae61";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=imperial`;

axios.get(`${apiUrl}&appid=${apiKey}`).then(displaytemp);
