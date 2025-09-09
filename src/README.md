# Weather Wise 🌤️

**Weather Wise** is a modern and intuitive web application that provides real-time weather information and a 5-day forecast for any city in the world. The app is built with a focus on a clean design, smooth user experience, and robust data handling.

## ✨ Features

- **Real-time Weather Data:** Get up-to-the-minute weather conditions for any city.
- **5-Day Forecast:** View upcoming weather patterns to help plan your week.
- **Search Functionality:** Easily find a city by name.
- **Geolocation Support:** Get weather data for your current location with a single click.
- **Unit Toggle:** Switch between Celsius and Fahrenheit with a button.
- **Dynamic UI:** The background changes dynamically to reflect the current weather conditions (e.g., sunny, rainy, cloudy).
- **Recent Searches:** A dropdown menu saves your last five searches for quick access.
- **Custom Animations:** Subtle animations enhance the user interface and overall experience.
- **Robust Error Handling:** The app provides clear, user-friendly error messages for invalid city names or failed requests, gracefully handling API errors.

## 🛠️ Technologies Used

- **HTML5:** For the application structure.
- **CSS3:** For custom styles and animations.
- **JavaScript (ES6+):** For all application logic, API calls, and DOM manipulation.
- **Tailwind CSS:** A utility-first CSS framework for rapid and responsive styling.
- **WeatherAPI.com:** The primary data source for all weather information.

## 🚀 Setup Instructions

Follow these steps to set up and run the project locally.

### Prerequisites

- A web browser (e.g., Chrome, Firefox, Safari).
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/).

### Step 1: Clone the Repository

Clone this project to your local machine:
```bash
git clone [https://github.com/sumitghiyal/-Weather-Forecast-Application.git]
Navigate into the project directory:

Bash

cd your-project-name
Step 2: Get Your API Key
Go to https://www.weatherapi.com/.

Sign up for a free account.

Once logged in, your API key will be displayed on the dashboard.

Step 3: Update the API Key
Open the script.js file and replace the placeholder API key with your own key:

JavaScript

const apiKey = 'YOUR_API_KEY'; // Replace '8f361b2f641744e7900150745250909' with your actual key
Step 4: Run the Application
Since this is a client-side application, you can simply open the index.html file in your web browser. There is no need for a local server.

💡 Usage
Search: Type a city name into the search bar and press the magnifying glass button or hit Enter.

Current Location: Click the "Use Current Location" button to automatically get weather data for your geographical location.

Recent Searches: Click the "Recently Searched" button to view and select from your last five searches.

Unit Toggle: Click the temperature unit button (°F or °C) to switch between Fahrenheit and Celsius.

© 2025 Your Name. All Rights Reserved.