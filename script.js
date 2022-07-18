var APIKey = '91cc19782de65de97eed583ef942a11e';
var cityName = document.querySelector('#city-name')
var searchBtn = document.querySelector('#search-btn')
var clearBtn = document.querySelector('#clear-btn')
var previousSearches = JSON.parse(localStorage.getItem('previous-searches')) || [];
var previousList = document.getElementById('previous-list')




function addListItem() { 
    previousSearches = previousSearches.reverse();
previousList.innerHTML = 
previousSearches.map(previousSearches => {
    return `<li>${previousSearches}</li>`
}).join("");
previousSearches = previousSearches.reverse();
}



clearData = e => {
    localStorage.clear();
}







searchCity = e => {
    e.preventDefault();
    document.querySelector('#city-temp').textContent = "Temp:"
    document.querySelector('#city-wind').textContent = "Wind:"
    document.querySelector('#city-humidity').textContent = "Humidity:"
    document.querySelector('#weather-icon').src = ""
    
    var searchName = cityName.value
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchName + "&appid=" + APIKey;
    cityName.value = '';
    console.log(searchName);

    previousSearches.push(searchName)

    previousSearches.splice();


    
    localStorage.setItem('previous-searches', JSON.stringify(previousSearches));

    addListItem();
fetch(queryURL)
    .then(response => response.json())
    .then(data => { console.log(data);

    var temp = data.main.temp - 273;
    temp = temp.toFixed(2)
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    var iconCode = data.weather[0].icon;
    console.log(iconCode);
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png"
    
    document.querySelector('#weather-icon').src = iconURL
    document.querySelector('#city-temp').append(' ' + temp + '°C');
    document.querySelector('#city-wind').append(' ' + wind + 'KPH');
    document.querySelector('#city-humidity').append(' ' + humidity + '%');
    
    })
}

addListItem();

