window.addEventListener('load', () => {
    let long;
    let lat;

    //only works if geolocation allowed
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        })
    } else {
        h1.textContent = "Location required for correct app function"
    }
});