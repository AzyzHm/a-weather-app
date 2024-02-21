const givenCity = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const country = document.getElementById('country');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const wind = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const time = document.getElementById('timezone');

const notFound = document.getElementById('not-found');
const info = document.getElementById('info');

searchButton.addEventListener('click', async () => {
    const apiKey = '07b3e2e4ad04ba75309b943525028ec0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${givenCity.value}&appid=${apiKey}`;

    if (givenCity.value === "") {
        alert("Please enter a city name");
    } else {
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "404") {
                notFound.style.display = "block";
                info.style.display = "none";
            } else {
                country.innerText = data.name + ", " + data.sys.country;
                temp.innerText = Math.floor(data.main.temp - 273.15) + "°C";
                weather.innerText = data.weather[0].main;
                wind.innerText = data.wind.speed + "m/s";
                humidity.innerText = data.main.humidity + "%";
                pressure.innerText = data.main.pressure + "hPa";
                visibility.innerText = data.visibility + "m";
                sunrise.innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
                sunset.innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString();
                time.innerText = new Date(data.dt * 1000).toLocaleTimeString();
                info.style.display = "block";
                notFound.style.display = "none";
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});
