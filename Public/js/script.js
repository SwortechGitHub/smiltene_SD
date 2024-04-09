const divResults = document.getElementById("div-results");
const btnSearch = document.getElementById("btn-search");
const inpCity = document.getElementById("inp-city");
const inpDays = document.getElementById("inp-days");
const selectedDaysCount = document.getElementById("selected-days-count");
const days = document.getElementById("days");

async function getWeatherByLocation(city, days) {
  try {
    const response = await fetch("http://localhost:3000/weather?city="+city+"&days="+days);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
}

function displayWeatherData(data) {
  let html = "";
  data.forEach((item) => {
    html += `
      <div class="card">
        <p>Temperature: ${item.main.temp}°C</p>
        <p>Feels like: ${item.main.feels_like}°C</p>
        <p>Weather: ${item.weather.description}</p>
        <img src="https://openweathermap.org/img/wn/${item.weather.icon}@2x.png">
        <p>Date: ${item.dt_txt}</p>
      </div>
    `;
  });
  divResults.innerHTML = html;
}

btnSearch.addEventListener("click", async () => {
  var city = "";
  city = inpCity.value;
  if (city) {
    try {
      displayWeatherData(await getWeatherByLocation(city, inpDays.value));
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      divResults.innerHTML = `<h1 class="error">City not found</h1>`;
    }
  }
});

days.innerText = inpDays.value;
inpDays.addEventListener("input", () => {
  days.innerText = inpDays.value;
});