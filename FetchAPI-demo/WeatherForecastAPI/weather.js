fetch("https://api.openweathermap.org/data/2.5/weather?lat=15.24&lon=120.67&appid=fc973ac711bc65ab7d1f53b04e0fca88")
.then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("NETWORK RESPONSE ERROR");
  }
})
.then(data => {
  console.log(data);
  displaymabiga(data)
})
.catch((error) => console.error("FETCH ERROR:", error));

function displaymabiga(data) {
    const mabigaDiv = document.getElementById("mabiga");
	
	const placeName = data.name;
	const heading = document.createElement("h1");
	heading.innerHTML = placeName;
	
	const country = document.createElement("p");
	country.innerHTML = "Country: " + data.sys.country;
	country.classList.add('country', 'center');
	
	const placeCoordinates = document.createElement("p");
	placeCoordinates.innerHTML = "Coordinates - Longitude: " + data.coord.lon + " Latitude: " + data.coord.lat;
	placeCoordinates.classList.add('placeCoordinates', 'center');
	
	const weather = document.createElement("p");
	weather.innerHTML = "Weather: " + data.weather[0].main + " - " + data.weather[0].description;
	weather.classList.add('weather', 'center');
	
	const humidity = document.createElement("p");
	humidity.innerHTML = "Humidity: " + data.main.humidity;
	humidity.classList.add('humidity', 'center');
	
	const temperature = document.createElement("p");
	let tempCelcius = (parseFloat(data.main.temp).toFixed(2) - 273.15).toFixed(2);
	temperature.innerHTML = "Temperature: " + tempCelcius.toString();
	temperature.classList.add('temperature', 'center');
	
	const pressure = document.createElement("p");
	pressure.innerHTML = "Pressure: " + data.main.pressure;
	pressure.classList.add('pressure', 'center');
	
	const wind = document.createElement("p");
	wind.innerHTML = "Wind speed: " + data.wind.speed; + " mph " + data.wind.deg + " degrees";
	wind.classList.add('wind', 'center');
	
	
	mabigaDiv.appendChild(heading);
	mabigaDiv.appendChild(country);
	mabigaDiv.appendChild(placeCoordinates);
	mabigaDiv.appendChild(weather);
	mabigaDiv.appendChild(humidity);
	mabigaDiv.appendChild(temperature);
	mabigaDiv.appendChild(pressure);
	mabigaDiv.appendChild(wind);
  }

