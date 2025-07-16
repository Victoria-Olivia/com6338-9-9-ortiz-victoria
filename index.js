// Your code here
var weatherForm = document.querySelector('#weather-app form');
var weatherSearch = document.getElementById('weather-search');
var weatherResult = document.getElementById('weather');
var myAPIKey = "365d4c7ae5b7fa08f02d7dccbf65d3ff";

weatherForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var searchLocation = weatherSearch.value.trim();
  if (!searchLocation) return; 
  weatherSearch.value = "";
  weatherResult.innerHTML = "";

var weatherURL = "https://api.openweathermap.org/data/2.5/weather";
var queryString = "?units=imperial&appid=" + myAPIKey + "&q=" + searchLocation;
var fetchURL = weatherURL + queryString;
fetch(fetchURL)
    .then(function(response) {
      if (response.status !== 200) {
        throw new Error("Location not found");
      }
        return response.json();
    })
    .then(function(data) {
    
        var cityAndCountry = document.createElement("h2");
        cityAndCountry.textContent = data.name + ", " + data.sys.country;
        weatherResult.appendChild(cityAndCountry);

        var googleMapLink = document.createElement("a");
        googleMapLink.href = "https://www.google.com/maps/search/?api=1&query=" + data.coord.lat + "," + data.coord.lon;
        googleMapLink.textContent = "Click to view map";
        weatherResult.appendChild(googleMapLink);

        var weatherIcon = document.createElement("img");
        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        weatherResult.appendChild(weatherIcon);

        var weatherDescription = document.createElement("p");
        weatherDescription.textContent = data.weather[0].description;
        weatherDescription.style.textTransform = "capitalize";
        weatherResult.appendChild(weatherDescription);
        weatherResult.appendChild(document.createElement("br"));

        var weatherTemp = document.createElement("p");
        weatherTemp.textContent = "Current: " + data.main.temp + "°F";
        weatherResult.appendChild(weatherTemp);

        var weatherFeelsLike = document.createElement("p");
        weatherFeelsLike.textContent = "Feels like: " + data.main.feels_like + "°F";
        weatherResult.appendChild(weatherFeelsLike);
        weatherResult.appendChild(document.createElement("br"));

        var date = new Date(data.dt * 1000);
        var timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
    });
    var lastUpdated = document.createElement("p");
        lastUpdated.textContent = "Last updated: " + timeString;
        weatherResult.appendChild(lastUpdated);
    })
    .catch(function() {
        var errorMessage = document.createElement("h2");
        errorMessage.textContent = "Location not found";
        weatherResult.appendChild(errorMessage);
    });
});