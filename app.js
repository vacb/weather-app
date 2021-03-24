window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationName = document.querySelector('.location-name');
    let temperature = document.querySelector('.temp');
    const tempSpan = document.querySelector('.degree-section span');

    // Only works if geolocation allowed
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=97b0ea97f6ddcb58985ab200a0ea66e3`;
            console.log(api);
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {description} = data.weather[0];
                    let {icon} = data.weather[0];
                    let temp = Math.floor(data.main.temp);
                    const name = data.name;
                    console.log(name);
                    // Set DOM elements from API
                    tempDegree.textContent = temp;
                    tempDescription.textContent = description;
                    locationName.textContent = name;

                    let farenheit = Math.floor(temp * 1.8 + 32);
                    // let celsius = (temp - 32) * 5 / 9;

                    // Map the openweathermap icon codes per their API to the skycons icon ids
                    const skyconMap = {
                        z01d: 'clear-day',
                        z02d: 'partly-cloudy-day',
                        z03d: 'cloudy',
                        z04d: 'cloudy',
                        z09d: 'showers-day',
                        z10d: 'rain',
                        z11d: 'thunder',
                        z13d: 'snow',
                        z50d: 'fog',
                        z01n: 'clear-night',
                        z02n: 'partly-cloudy-night',
                        z03n: 'cloudy',
                        z04n: 'cloudy',
                        z09n: 'showers-night',
                        z10n: 'rain',
                        z11n: 'thunder',
                        z13n: 'snow',
                        z50n: 'fog'
                    }
                 
                    icon = 'z' + icon;
                    icon = skyconMap[icon].toUpperCase();
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature to Celsius/Farenheit
                    temperature.addEventListener('click', () => {
                        if (tempSpan.textContent === 'C') {
                            tempSpan.textContent = 'F';
                            tempDegree.textContent = farenheit;
                        } else {
                            tempSpan.textContent = 'C';
                            tempDegree.textContent = temp;
                        }
                    });
                })
        })
    } else {
        h1.textContent = "Location required for correct app function"
    }

function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
       skycons.play();
    return skycons.set(iconID, Skycons[icon]);
}

 
});