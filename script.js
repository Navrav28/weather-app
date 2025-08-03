const form = document.querySelector("form");
const input = document.querySelector(".formInput");
const humidityImage = document.querySelector(".humidityImage");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

const getWeatherData = async (inputdata) => {
  try {
    const apikey = "2ad4c94e7a74f584b49927ff3e79a2e9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputdata}&appid=${apikey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
    description.innerHTML = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1).toLowerCase();
    humidity.innerHTML = `${data.main.humidity}%`;
    windSpeed.innerHTML = `${data.wind.speed} km/h`;
    console.log(data);
  } catch (error) {
      console.error("Error fetching weather data:", error);
      
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchInput = input.value.trim();
  if (searchInput !== "") {
    getWeatherData(searchInput);
  }
  // getWeatherData(searchInput)
});
