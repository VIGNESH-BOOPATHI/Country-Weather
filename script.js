document.addEventListener("DOMContentLoaded", function() {
    const countryCardsContainer = document.getElementById("countryCards");

    // Fetch data from the REST Countries API
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
        // Create cards for each country
        data.forEach(country => {
            const card = createCountryCard(country);
            countryCardsContainer.appendChild(card);
        });
    })
    .catch(error => console.error("Error fetching country data:", error));

    // Function to create a Bootstrap card for a country
    function createCountryCard(country) {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "col-sm-12");
        
        const cardContent = `
            <div class="card">
                <div class="card-header">${country.name.common}</div>
                <div class="card-body">
                    <img src="${country.flags.png}" alt="Flag" class="img-fluid">
                    <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
                    <p><strong>Latlng:</strong> ${country.latlng?.join(", ") || "N/A"}</p>
                    <p><strong>Region:</strong> ${country.region || "N/A"}</p>
                    <p><strong>Country Code:</strong> ${country.cca2 || "N/A"}</p>
                    <button class="btn btn-primary fetch-weather-btn">Click for Weather</button>
                    <div class="weather-info"></div>
                    </div>
            </div>
        `;
        card.innerHTML = cardContent;
        
        // Add event listener to the button for fetching weather on click
        const fetchWeatherBtn = card.querySelector(".fetch-weather-btn");
        fetchWeatherBtn.addEventListener("click", () => {
            toggleWeatherDisplay(country.name.common, card);
        });

        return card;
    }

    // Function to toggle the display of weather information
    function toggleWeatherDisplay(countryName, card) {
        const weatherInfo = card.querySelector(".weather-info");
        const isWeatherDisplayed = weatherInfo.textContent !== "";
        
        if (isWeatherDisplayed) {
            weatherInfo.textContent = ""; // Clear weather info
        } else {
            fetchWeather(countryName, card);
        }
    }

    // Function to fetch weather data for a country from OpenWeatherMap API
    function fetchWeather(countryName, card) {
        const weatherInfo = card.querySelector(".weather-info");
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=ebed7dac813eb97c2c2171adc839a350`)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather?.[0].description || "N/A";
            weatherInfo.textContent = `Weather: ${weatherDescription}`;
        })
        .catch(error => console.error("Error fetching weather data:", error));
    }
});