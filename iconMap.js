// Map the openweathermap icon codes per their API to the skycons icon ids
const iconMap = openWeatherIcon => {
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

    prependZToIcon = 'z' + openWeatherIcon;
    convertedIcon = skyconMap[prependZToIcon].toUpperCase();
    return convertedIcon;
}   