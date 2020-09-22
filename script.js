var apiKey = "e9113e6691f059434468dd7f865dc140"

$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#cityName").val();
    console.log(cityName); 
    forecast(cityName);
})

function forecast (cityName){
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then (function(apiData){
        console.log(apiData);
    })
}