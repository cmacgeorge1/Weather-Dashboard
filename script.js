var apiKey = "e9113e6691f059434468dd7f865dc140"

$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#cityName").val();
    console.log(cityName); 
    forecast(cityName);
    fiveDayForecast(cityName)
})

function forecast (cityName){
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then (function(apiData){
        console.log(apiData);
        $("#currentData").html(`
        <div class='card'>
        <h6>City: ${apiData.name}</h6>
        <p>Weather: ${apiData.weather[0].description}</p>
        <p>Temp: ${apiData.main.temp}</p>
        <p>Temp: ${apiData.main.humidity}</p>
        <p>Speed: ${apiData.wind.speed}</p>
        <img src="http://openweathermap.org/img/wn/${apiData.weather[0].icon}.png" />
        `)
    })
}

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
        <div class='card'>
        <h6>Date: ${apiData.list[i].dt_txt}</h6>
        <p>Weather: ${apiData.list[i].weather[0].description}</p>
        <p>Temp: ${apiData.list[i].main.temp}</p>
        <p>Temp: ${apiData.list[i].main.humidity}</p>
        <p>Speed: ${apiData.list[i].wind.speed}</p>
        <img src="http://openweathermap.org/img/wn/${apiData.list[i].weather[0].icon}.png" />
        `
        }
        $("#fiveDayData").html(htmlString)
    })
}

