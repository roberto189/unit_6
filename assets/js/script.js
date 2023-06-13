const apiKey = "b9fe50f1bc06f17cccf57381fc2658d8";
const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const currentWeatherSection = document.querySelector("#current-weather");
const fiveDayForecastSection = document.querySelector("#five-day-forecast");
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];


function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
    
      displayCurrentWeather(data);
    })
    .catch((error) => console.error(error));

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      
      displayFiveDayForecast(data);
    })
    .catch((error) => console.error(error));
}

function displayCurrentWeather(data) {
  currentWeatherSection.innerHTML = "";

  const cityName = data.name;
  const date = new Date(data.dt * 1000).toLocaleDateString();
  const iconCode = data.weather[0].icon;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const cityHeading = document.createElement("h2");
  cityHeading.textContent = cityName;

  const dateParagraph = document.createElement("p");
  dateParagraph.textContent = date;

  const iconImage = document.createElement("img");
  iconImage.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

  const temperatureParagraph = document.createElement("p");
  const temperatureFahrenheit = (temperature - 273.15) * 9/5 + 32;
  temperatureParagraph.textContent = `Temperature: ${temperatureFahrenheit.toFixed(2)}°F`;

  const humidityParagraph = document.createElement("p");
  humidityParagraph.textContent = `Humidity: ${humidity}%`;

  const windSpeedParagraph = document.createElement("p");
  windSpeedParagraph.textContent = `Wind Speed: ${windSpeed} m/s`;

  currentWeatherSection.appendChild(cityHeading);
  currentWeatherSection.appendChild(dateParagraph);
  currentWeatherSection.appendChild(iconImage);
  currentWeatherSection.appendChild(temperatureParagraph);
  currentWeatherSection.appendChild(humidityParagraph);
  currentWeatherSection.appendChild(windSpeedParagraph);
}

// ...

function displayFiveDayForecast(data) {
  const forecastItems = data.list;

  for (let i = 0; i < forecastItems.length; i++) {
    const forecastItem = forecastItems[i];

    const date = new Date(forecastItem.dt * 1000).toLocaleDateString();
    const iconCode = forecastItem.weather[0].icon;
    const temperature = forecastItem.main.temp;
    const humidity = forecastItem.main.humidity;

    const forecastCard = document.createElement("div");
    forecastCard.classList.add("col-sm-2", "bg-primary", "forecast", "text-white", "ml-2", "mb-3", "p-2", "mt-2", "rounded");

    const dateParagraph = document.createElement("p");
    dateParagraph.textContent = date;
    forecastCard.appendChild(dateParagraph);

    const iconImage = document.createElement("img");
    iconImage.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
    forecastCard.appendChild(iconImage);

    const temperatureParagraph = document.createElement("p");
    const temperatureFahrenheit = (temperature - 273.15) * 9 / 5 + 32;
    temperatureParagraph.textContent = `Temp: ${temperatureFahrenheit.toFixed(2)}°F`;
    forecastCard.appendChild(temperatureParagraph);

    const humidityParagraph = document.createElement("p");
    humidityParagraph.textContent = `Humidity: ${humidity}%`;
    forecastCard.appendChild(humidityParagraph);

    const forecastElement = document.querySelector(`#fDate${i}`);
    forecastElement.innerHTML = "";
    forecastElement.appendChild(forecastCard);
  }
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  getWeatherData(city);
  searchHistory.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  cityInput.value = "";
}


const cities = [
  "Seattle",
  "New York",
  "Los Angeles",
  "San Francisco",
  "Miami",
  "Chicago",
  "Toronto",
  "London",
  "Paris",
  "Rio de Janeiro",
  "Mexico City"
];


const cityButtons = document.querySelectorAll(".city-choice");
cityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const city = button.textContent;
    getWeatherData(city);
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  });
});

searchForm.addEventListener("submit", handleSearchFormSubmit);