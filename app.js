window.addEventListener('load', () => {
    let long;
    let lat;
    const tempDescription = document.querySelector('.temp-description');
    const tempDegree = document.querySelector('.temp-degree');
    const locationName = document.querySelector('.location-name');
    const temperature = document.querySelector('.temp');
    const tempSpan = document.querySelector('.degree-section span');

    // Only works if geolocation allowed
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=97b0ea97f6ddcb58985ab200a0ea66e3`;
            
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
                 
                    // Set DOM elements from API
                    tempDegree.textContent = temp;
                    tempDescription.textContent = description;
                    locationName.textContent = name;

                    let farenheit = Math.floor(temp * 1.8 + 32);
                   
                    // Skycons set icons function
                    setIcons(iconMap(icon), document.querySelector('.icon'));

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

const setIcons= (icon, iconID) => {
    const skycons = new Skycons({ color: 'white' });
       skycons.play();
    return skycons.set(iconID, Skycons[icon]);
}

 
});