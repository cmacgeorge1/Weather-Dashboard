var apiKey = "e9113e6691f059434468dd7f865dc140"

$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#cityName").val();
    console.log(cityName); 
    forecast(cityName);
    fiveDayForecast(cityName)
})
// Entered city forecast
function forecast (cityName){
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then (function(apiData){
        console.log(apiData);
        var lat = apiData.coord.lat
        var lon = apiData.coord.lon
        var uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`
        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then (function(uvData){
            console.log(uvData)
            $("#uvIndex").append("UV Index"+uvData.value)
        })
        $("#currentData").html(`
        <div class='card' id='current'>
        <img src="https://openweathermap.org/img/wn/${apiData.weather[0].icon}.png" />
        <h5>City: ${apiData.name}</h5>
        <p>Weather: ${apiData.weather[0].description}</p>
        <p>Temp: ${apiData.main.temp}</p>
        <p>Humidity: ${apiData.main.humidity}</p>
        <p>Wind Speed: ${apiData.wind.speed}</p>
        `)
    })
}
// Five day forecast
function fiveDayForecast (cityName){
    var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then (function(apiData){
        console.log(apiData);
        var htmlString = "";
        for (let i=0; i<apiData.list.length; i=i+8) {
            htmlString += `
        <div class='card' id='outlook'>
        <h6>Date: ${apiData.list[i].dt_txt}</h6>
        <img src="https://openweathermap.org/img/wn/${apiData.list[i].weather[0].icon}.png" />
        <p>Weather: ${apiData.list[i].weather[0].description}</p>
        <p>Temp: ${apiData.list[i].main.temp}</p>
        <p>Humidity: ${apiData.list[i].main.humidity}</p>
        <p>Speed: ${apiData.list[i].wind.speed}</p>
        `
        }
        $("#fiveDayData").html(htmlString)
    })
}

