const api = {
    key: "45d1758a298387baf6aada9fbc076dc3",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){    
    if(evt.keyCode == 13){
        getResults(searchbox.value); 
    }  
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather){
    console.log(weather);

    let city = document.querySelector('.location .city');
    let temp = document.querySelector('.current .temp');
    let weather_el = document.querySelector('.current .weather');
    let hilow = document.querySelector('.hi-low');
    let now = new Date();
    let date = document.querySelector('.location .date');

    if(weather.id == null){
        city.innerHTML = "La ciudad que buscas no existe.";
        temp.innerHTML = "";
        weather_el.innerHTML = "";
        hilow.innerHTML = "";
        date.innerHTML = "";
    
    }
    
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    date.innerText = dateBuilder(now);
    
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>ºC</span>`;
   
    weather_el.innerText = weather.weather[0].main;
    
    hilow.innerText = `Min: ${Math.round(weather.main.temp_min)} ºC / Max: ${Math.round(weather.main.temp_max)} ºC`;
    
}

function dateBuilder(d){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}