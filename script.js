
const apiKey = 'eed2e5cf9e075bfe8d0fc299922ac9fe';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const errorElement = document.getElementById('error');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();

    if (location) {
        fetchWeather(location);
    } else {
        errorElement.textContent = 'Please enter a city.';
    }
});

async function fetchWeather(location) {
    errorElement.textContent = '';

    try {
        const url = `${apiUrl}?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found or API error.');
        }

        const data = await response.json();

        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
    } catch (error) {
        errorElement.textContent = error.message;
    }
}
