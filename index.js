// Your code here
const weatherForm = document.querySelector('#weather-app form');
const weatherSearch = document.getElementById('weather-search');
const weatherResult = document.getElementById('weather');
const myAPIKey = "365d4c7ae5b7fa08f02d7dccbf65d3ff";

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchLocation = weatherSearch.value.trim();
  if (!searchLocation) return; 
  weatherSearch.value = "";
  weatherResult.innerHTML = "";

const fetchURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${myAPIKey}&q=${searchLocation}`;
try {
  const response = await fetch(fetchURL);
  if (response.status !== 200) {
    throw new Error('Location not found');
  }
  const data = await response.json();
  console.log(data);
  const {
    name,
    sys: { country },
    coord: { lat, lon },
    weather,
    main: { temp, feels_like },
    dt,
  } = data;
  
        const cityAndCountry = document.createElement("h2");
        cityAndCountry.textContent = `${name}, ${country}`;
        weatherResult.appendChild(cityAndCountry);

        const googleMapLink = document.createElement("a");
        googleMapLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
        googleMapLink.textContent = "Click to view map";
        weatherResult.appendChild(googleMapLink);

        const weatherIcon = document.createElement("img");
        weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        weatherResult.appendChild(weatherIcon);

        const weatherDescription = document.createElement("p");
        weatherDescription.textContent = data.weather[0].description;
        weatherDescription.style.textTransform = "capitalize";
        weatherResult.appendChild(weatherDescription);
        weatherResult.appendChild(document.createElement("br"));

        const weatherTemp = document.createElement("p");
        weatherTemp.textContent = `Current: ${temp}°F`;
        weatherResult.appendChild(weatherTemp);

        const weatherFeelsLike = document.createElement("p");
        weatherFeelsLike.textContent = `Feels like: ${feels_like}°F`;
        weatherResult.appendChild(weatherFeelsLike);
        weatherResult.appendChild(document.createElement("br"));

        const date = new Date(data.dt * 1000);
        const timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
    });
    const lastUpdated = document.createElement("p");
        lastUpdated.textContent = `Last updated: ${timeString}`;
        weatherResult.appendChild(lastUpdated);
        
  } catch (error) {
        const errorMessage = document.createElement("h2");
        errorMessage.textContent = "Location not found";
        weatherResult.appendChild(errorMessage);
  }
});