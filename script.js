const form = document.querySelector("form");
const input = document.querySelector(".formInput");
const humidityImage = document.querySelector(".humidityImage");
const weatherImg = document.querySelector(".weatherImg");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weather_info = document.querySelector(".weather_info");
const location_notFound = document.querySelector(".location_notFound");

const getWeatherData = async (inputdata) => {
  try {
    const apikey = "2ad4c94e7a74f584b49927ff3e79a2e9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputdata}&appid=${apikey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.cod === '404') {
      location_notFound.style.display = "flex";
      weather_info.style.display = "none";
      return;
    }
    console.log(data);
    location_notFound.style.display = "none";
    weather_info.style.display = "flex";
    temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
    description.innerHTML =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1).toLowerCase();
    humidity.innerHTML = `${data.main.humidity}%`;
    windSpeed.innerHTML = `${data.wind.speed} km/h`;
    switch (data.weather[0].main) {
      case "Clear":
        weatherImg.src = "./images/sunny.png";
        break;
      case "Clouds":
        weatherImg.src = "./images/cloud.png";
        break;
      case "Rain":
        weatherImg.src = "./images/rain.png";
        break;
      case "Snow":
        weatherImg.src = "./images/winter.png";
        break;
      case "Mist":
        weatherImg.src = "./images/mist.png";
        break;
      default:
        humidityImage.src = "./images/default.png";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchInput = input.value.trim();
  if (searchInput !== "") {
    getWeatherData(searchInput);
  } else {
    alert("Please enter a city name");
  }
  // getWeatherData(searchInput)
});
