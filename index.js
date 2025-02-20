const weatherform = document.querySelector(".wform");
const cityInput = document.querySelector(".cityInput");
const container = document.querySelector(".container");
const apikey = "";  // Type an Api Key for Weather Data

weatherform.addEventListener("submit" , async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try {
            const WeatherData = await getWeatherData(city);
            displayWeatherInfo(WeatherData);
        } catch (error) {
            displayErrorMessage(error);
        }

    }else{
        displayErrorMessage("Please Enter a City");
    }

});

async function getWeatherData(city) {
    const apiUrl = ``; // API URL of the Wheather data;  
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Cloud not fetch any data");
    }

    return await response.json();
}
function displayWeatherInfo(data){

    console.log(data);

    const {name: city , 
        main: {temp , humidity} , 
        weather: [{description , icon}]} = data;

    console.log(data);
    container.textContent = "";
    container.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const skyDisplay = document.createElement("p");
    const wEmoji = document.createElement("img");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15)).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    skyDisplay.textContent = description;
    wEmoji.src = ``; // if there was a png url provide by the server


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    skyDisplay.classList.add("skyDisplay");
    wEmoji.classList.add("wEmoji");


    container.appendChild(cityDisplay);
    container.appendChild(tempDisplay);
    container.appendChild(humidityDisplay);
    container.appendChild(skyDisplay);
    container.appendChild(wEmoji);

}

// if there was an not any png of wheater forcast behaviour we can use this emojii

// function getWeatherEmoji(weatherId){

//     switch(weatherId.toString().charAt(0)){
//         case '2':
//             return "⛈";
//         case '3':
//             return "🌦";
//         case '5':
//             return "🌧";
//         case '6':
//             return "❄";
//         case '7':
//             return "🌫";
//         case '8':
//             return weatherId === 800 ? '☀' : '☁';
//         default:
//             return "🌈";
//     }

// }

function displayErrorMessage(error){

    const errorMessage = document.createElement("p");
    errorMessage.textContent = error;
    errorMessage.classList.add("errorDisplay");

    container.textContent = "";

    container.style.display = "flex";
    container.appendChild(errorMessage);


}