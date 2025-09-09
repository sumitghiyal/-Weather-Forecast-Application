const apiKey = '8f361b2f641744e7900150745250909';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location-btn');
const weatherCard = document.getElementById('weather-card');
const cityNameEl = document.getElementById('city-name');
const weatherDescriptionEl = document.getElementById('weather-description');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const errorMessageEl = document.getElementById('error-message');
const tempToggleBtn = document.getElementById('temp-toggle-btn');
const weatherAlertEl = document.getElementById('weather-alert');
const dropdownContainer = document.getElementById('dropdown-container');
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

// Global state variables for temperature toggle
let currentTempCelsius = null;
let currentUnit = 'C';

// Helper functions for showing/hiding elements
const showElement = (element) => element.classList.remove('hidden');
const hideElement = (element) => element.classList.add('hidden');

// Function to handle fetching weather data from the API
async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        // WeatherAPI.com returns a JSON error object, not a 404 status.
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Function to update the UI with fetched weather data
function updateUI(data) {
    hideElement(errorMessageEl);
    showElement(weatherCard);
    
    // Check if the city already exists in localStorage
    const searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    const isCityExist = searchedCities.some(city => city.name === data.location.name);
    
    if (!isCityExist) {
        const newCity = {
            name: data.location.name,
            lat: data.location.lat,
            lon: data.location.lon
        };
        searchedCities.unshift(newCity);
        const limitedCities = searchedCities.slice(0, 5);
        localStorage.setItem('searchedCities', JSON.stringify(limitedCities));
        populateDropdown();
    }

    // Populate DOM elements with data from WeatherAPI.com's JSON response
    cityNameEl.textContent = data.location.name;
    weatherDescriptionEl.textContent = data.current.condition.text;
    weatherIconEl.src = `https:${data.current.condition.icon}`;
    
    // Store temperature in Celsius for toggling
    currentTempCelsius = Math.round(data.current.temp_c);
    temperatureEl.textContent = `${currentTempCelsius}°C`;
    
    humidityEl.textContent = `${data.current.humidity}%`;
    windSpeedEl.textContent = `${data.current.wind_kph} km/h`;
    
    // Custom weather alert for extreme temperatures
    if (currentTempCelsius > 40) {
        showElement(weatherAlertEl);
        weatherAlertEl.textContent = 'High temperature alert! Stay hydrated.';
    } else {
        hideElement(weatherAlertEl);
    }
    
    // Dynamic background change based on weather condition
    updateBackground(data.current.condition.text);
}

// Function to toggle temperature unit between Celsius and Fahrenheit
function toggleTemperatureUnit() {
    if (currentUnit === 'C') {
        const tempFahrenheit = Math.round((currentTempCelsius * 9/5) + 32);
        temperatureEl.textContent = `${tempFahrenheit}°F`;
        tempToggleBtn.textContent = '°C';
        currentUnit = 'F';
    } else {
        temperatureEl.textContent = `${currentTempCelsius}°C`;
        tempToggleBtn.textContent = '°F';
        currentUnit = 'C';
    }
}

// Function to update the background based on weather condition
function updateBackground(weatherCondition) {
    const body = document.body;
    body.classList.remove('bg-sunny', 'bg-rainy', 'bg-cloudy', 'bg-snowy');
    
    const conditionText = weatherCondition.toLowerCase();
    
    if (conditionText.includes('sun') || conditionText.includes('clear')) {
        body.classList.add('bg-sunny');
    } else if (conditionText.includes('rain') || conditionText.includes('drizzle')) {
        body.classList.add('bg-rainy');
    } else if (conditionText.includes('cloud') || conditionText.includes('overcast')) {
        body.classList.add('bg-cloudy');
    } else if (conditionText.includes('snow') || conditionText.includes('sleet')) {
        body.classList.add('bg-snowy');
    } else {
        body.classList.add('bg-other');
    }
}

// Function to populate the dropdown menu with recently searched cities
function populateDropdown() {
    const searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    if (searchedCities.length > 0) {
        showElement(dropdownContainer);
        dropdownMenu.innerHTML = ''; // Clear previous items
        searchedCities.forEach(city => {
            const cityItem = document.createElement('a');
            cityItem.href = '#';
            cityItem.textContent = city.name;
            cityItem.classList.add('block', 'px-4', 'py-2', 'text-gray-700', 'hover:bg-blue-100', 'transition-colors', 'duration-150');
            cityItem.dataset.lat = city.lat;
            cityItem.dataset.lon = city.lon;
            dropdownMenu.appendChild(cityItem);
        });
    } else {
        hideElement(dropdownContainer);
    }
}

// Event listeners for user interactions
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (city === '') {
        hideElement(weatherCard);
        showElement(errorMessageEl);
        errorMessageEl.textContent = 'Please enter a city name.';
        return;
    }
    // WeatherAPI.com endpoint for current weather by city name
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const data = await fetchWeatherData(url);
    if (data) {
        updateUI(data);
    } else {
        hideElement(weatherCard);
        showElement(errorMessageEl);
        errorMessageEl.textContent = 'City not found. Please try again.';
    }
});

currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // WeatherAPI.com endpoint for current weather by coordinates
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
            const data = await fetchWeatherData(url);
            if (data) {
                updateUI(data);
            } else {
                hideElement(weatherCard);
                showElement(errorMessageEl);
                errorMessageEl.textContent = 'Unable to retrieve weather for your location.';
            }
        }, () => {
            hideElement(weatherCard);
            showElement(errorMessageEl);
            errorMessageEl.textContent = 'Geolocation denied. Please allow location access.';
        });
    } else {
        hideElement(weatherCard);
        showElement(errorMessageEl);
        errorMessageEl.textContent = 'Geolocation is not supported by your browser.';
    }
});

tempToggleBtn.addEventListener('click', toggleTemperatureUnit);

// Event delegation for dynamically added dropdown items
dropdownMenu.addEventListener('click', async (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.tagName === 'A') {
        const lat = target.dataset.lat;
        const lon = target.dataset.lon;
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
        const data = await fetchWeatherData(url);
        if (data) {
            updateUI(data);
            hideElement(dropdownMenu);
        } else {
            hideElement(weatherCard);
            showElement(errorMessageEl);
            errorMessageEl.textContent = 'Unable to retrieve weather for the selected city.';
        }
    }
});

dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});

// Initial call to populate the dropdown on page load
document.addEventListener('DOMContentLoaded', populateDropdown);