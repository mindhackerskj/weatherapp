var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                if(data.description === "haze" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } else if(data.description ==="haze" || data.description === "fog" || data.description === "smoke"){
                    weatherIcon.className = "wi wi-day-fog"
                }
                else if(data.description ==="few clouds" || data.description === "scattered clouds" || data.description === "broken clouds" || data.description === "overcast clouds"){
                    weatherIcon.className = "wi wi-day-cloudy-high"
                }
                else {
                    weatherIcon.className = "wi wi-day-sunny" + data.description}
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature
                     - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
            }
        }) 
    });
})