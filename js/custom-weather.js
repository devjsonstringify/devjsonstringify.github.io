"use strict";


//activate map via scroll event
var controller = new ScrollMagic.Controller();
var mapWeather = new ScrollMagic.Scene({
        triggerElement: "#intro1",
        reverse: false
    }) //mapWeather
    .setClassToggle('#intro1', 'showMapWeather')
    .addTo(controller);


//map and weather 
var runWeatherMap = function () {
    // Check to see if the browser supports the GeoLocation API.
    if (navigator.geolocation) {
        // Get the location
        navigator.geolocation.watchPosition(function (position) {

                //get the coordinates
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                var xhr,
                    city = 'lat=' + lat + '&lon=' + lon,
                    appId = 'APPID=81e6708dcd52386955430e6897e02992',
                    unitCelcius = 'units=metric',
                    weatherLang = 'lang=en',
                    weatherMode = ' mode=json',
                    openWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?' + city + '&' + appId + '&' + unitCelcius + '&' + weatherLang + '&' + weatherMode;
                //to make url dynamic so i can change each parameters in weather API
                var uriEnc = encodeURIComponent(openWeatherURL);
                var urlDec = decodeURIComponent(uriEnc);

                //calling map
                var map = L.map('mapId', {
                    center: [lat, lon],
                    zoom: 17,
                    scrollWheelZoom: false
                });

                //marker
                var mapMarker = L.icon({
                    iconUrl: 'img/assets/mapMarker.png',
                    iconSize: [42, 42], // size of the icon
                });
                var marker = L.marker([lat, lon], {
                    icon: mapMarker
                }).addTo(map);

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map); //tileLayer

                //for older broswser
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } //window.XMLHttpRequest            

                //function to convert UNIX timestamp
                function calcuTime(dynamicTime) {
                    // Create a new JavaScript Date object based on the timestamp
                    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                    var date = new Date(dynamicTime * 1000);
                    // Hours part from the timestamp
                    var hours = date.getHours();
                    //12 hour format
                    var hourFormat = hours >= 12 ? 'pm' : 'am';
                    // Minutes part from the timestamp
                    var minutes = "0" + date.getMinutes();
                    //get date todayTimeDate
                    var dateTodayIs = date.getDate();
                    //get day
                    var weekday = new Array(7);
                    weekday[0] = "Sun";
                    weekday[1] = "Mon";
                    weekday[2] = "Tue";
                    weekday[3] = "Wed";
                    weekday[4] = "Thur";
                    weekday[5] = "Fri";
                    weekday[6] = "Sat";
                    var exactDay = weekday[date.getDay()];

                    //get month
                    var month = new Array(7);
                    month[0] = "Jan";
                    month[1] = "Feb";
                    month[2] = "Mar";
                    month[3] = "Apr";
                    month[4] = "May";
                    month[5] = "Jun";
                    month[6] = "Jul";
                    month[7] = "Aug";
                    month[8] = "Sept";
                    month[9] = "Oct";
                    month[10] = "Nov";
                    month[11] = "Dec";
                    var exactMonth = month[date.getMonth()];
                    // Will display time in 10:30:23 format
                    var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + hourFormat;
                    return formattedTime;
                } //calcuTime  ---

                //clouds animation
                function toAnimateCloudsIcon() {
                    var cloud = document.getElementsByClassName('iconWeather');
                    var cloudsRandom = Math.floor((Math.random() * 10) + 1);
                    TweenMax.to(cloud, 5, {
                        x: cloudsRandom,
                        autoAlpha: 0.1,
                        repeat: -1,
                        repeatDelay: 1,
                        ease: Linear.easeIn
                    }, 0.5); //TweenMax	
                } //toAnimateCloudsIcon --

                //map marker animation
                function toAnimatemarKerMap() {
                    var markerMap = document.getElementsByClassName('leaflet-marker-icon');
                    TweenMax.from(markerMap, 2, {
                        autoAlpha: 1,
                        y: "100",
                        ease: Bounce.easeOut
                    }); //TweenMax	
                } //toAnimatemarKerMap -- 

                //for handling success request
                xhr.onreadystatechange = function () {
                    if ((xhr.readyState === 4) && (xhr.status === 200)) {
                        var infoWeather = JSON.parse(xhr.responseText);
                        var dynamicDisplayingEl = '';

                        //Current weather data 
                        dynamicDisplayingEl = '<ul class="list-group">'
                        dynamicDisplayingEl += '<li class="list-group-item">' + '<h3>' + 'Weather in' + " " + infoWeather.name + ',' + infoWeather.sys.country + '</h3>'; + '</li>';
                        dynamicDisplayingEl += '<li class="list-group-item">' + '<p>' + '<img class="iconWeather" src="http://api.openweathermap.org/img/w/' + infoWeather.weather[0].icon + '.png" alt="' + infoWeather.weather[0].description + '"/>' + '<strong>' + infoWeather.main.temp.toPrecision(2) + " " + "°C" + '</strong>' + '</p>' + '</li>';
                        dynamicDisplayingEl += '<li class="list-group-item">' + infoWeather.weather[0].description + '</li>';
                        dynamicDisplayingEl += '</ul>';
                        document.getElementById('weather-container-info').innerHTML = dynamicDisplayingEl;

                        //table main weather information
                        var mainWeatherInformation = '';
                        mainWeatherInformation = '<div class="weatherEach">' +
                            '<table class="table table-bordered table-hover table-responsive">' +
                            '<tbody>' +

                            '<tr>' +
                            '<td>' + 'Wind' + '</td>' +
                            '<td>' + infoWeather.main.temp + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Cloudiness' + '</td>' +
                            '<td>' + infoWeather.clouds.all + '%' + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Pressure' + '</td>' +
                            '<td>' + infoWeather.main.pressure + " " + 'hPa' + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Humidity' + '</td>' +
                            '<td>' + infoWeather.main.humidity + " " + '%' + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Sunrise' + '</td>' +
                            '<td>' + calcuTime(infoWeather.sys.sunrise) + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Sunset ' + '</td>' +
                            '<td>' + calcuTime(infoWeather.sys.sunset) + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Geo coords' + '</td>' +
                            '<td>' + '[' + infoWeather.coord.lon + " " + infoWeather.coord.lat + ']' + '</td>' +
                            '</tr>' +

                            '</tbody>' +
                            '</table>'
                        mainWeatherInformation += '</div>';

                        //displaying JSON data
                        var headerWeatherInfo = document.getElementById('weather-container');
                        headerWeatherInfo.innerHTML = mainWeatherInformation;

                        //set time out for the animation
                        setTimeout(toAnimateCloudsIcon, 1000);
                        setTimeout(toAnimatemarKerMap, 100);

                    } //xhr.readyState
                } //xhr.onreadystatechange

                //XMLHtppRequest methods
                xhr.open('GET', urlDec);
                xhr.send();


                //handling error if user wont grant location permission
            },
            function (error) {

                //function for displaying error message
                function displayError(errorMessage) {
                    var notGrandtedEle = document.createElement("div");
                    var notGrandtedMes = document.createTextNode(errorMessage);
                    notGrandtedEle.setAttribute("class", "usser-not-Granted");
                    notGrandtedEle.appendChild(notGrandtedMes);
                    document.getElementById('mapId').appendChild(notGrandtedEle);
                }

                //function for displaying GIF from 'Giphy'
                function getGiphy() {

                    var gifRequest;
                    //for older broswser
                    if (window.XMLHttpRequest) {
                        gifRequest = new XMLHttpRequest();
                    } else {
                        gifRequest = new ActiveXObject("Microsoft.XMLHTTP");
                    } //window.XMLHttpRequest    


                    //removing weather information div
                    function removingHTML() {
                        var $rowContainer = document.querySelector('.row');
                        var $removeContentRight = document.querySelector('.contentRight');
                        $rowContainer.removeChild($removeContentRight);
                    } //removingHTML

                    gifRequest.open("GET", 'http://api.giphy.com/v1/gifs/feqkVgjJpYtjy?api_key=dc6zaTOxFJmzC');
                    gifRequest.onreadystatechange = function () {
                        if ((gifRequest.readyState === 4) && (gifRequest.status === 200)) {
                            var infoGif = JSON.parse(gifRequest.responseText);
                            // Action to be performed when the document is read;

                            var gifHtml = '';
                            gifHtml += '<figure class="gifFigure">' + '<img src = "' + infoGif.data.images.fixed_height.url + '">' + '<figcaption>' + 'We need your location, refresh and select allow.' + '<figcaption>' + '</figure>';
                            gifHtml += '<figure id="gifPoweredBy">' + '<a href="https://giphy.com">' + '<img src = "img/assets/PoweredBy_200_Horizontal_Light-Backgrounds_With_Logo.gif" alt="Powered By Giphy">' + '</a>' + '</figure>';
                            document.querySelector('#mapId').innerHTML = gifHtml;
                            removingHTML();
                        } //gifRequest.readyState
                    } //gifRequest.readyState
                    //xmlhtpprequest method open                   
                    gifRequest.send();
                } //getGiphy


                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        // User denied access to location. Perhaps redirect to alternate content?
                        setTimeout(getGiphy, 1000);
                        setTimeout(displayError('User denied access to location.'), 1500);
                        break;
                    case error.POSITION_UNAVAILABLE:
                        //                        alert('Position is currently unavailable "\n" Check your internet connection.');
                        setTimeout(getGiphy, 1000);
                        setTimeout(displayError('Position is currently unavailable Check your internet connection.'), 1500);
                        break;
                    case error.PERMISSION_DENIED_TIMEOUT:
                        //                        alert('User took to long to grant/deny permission.');
                        setTimeout(getGiphy, 1000);
                        setTimeout(displayError('User took to long to grant/deny permission.'), 1500);
                        break;
                    case error.UNKNOWN_ERROR:
                        //                        alert('An unknown error occurred.')
                        setTimeout(getGiphy, 1000);
                        setTimeout(displayError('An unknown error occurred'), 1500);
                        break;
                } // switch (error.code)
            }); //navigator.geolocation.watchPosition

    } else {
        // Print out a message to the user.
        document.write('Your browser does not support GeoLocation');
    } //if else navigator.geolocation

} //runWeatherMap

//activate map and weather when user reach the div parent of weather
mapWeather.on('start', function () {
    runWeatherMap();

    //weather and map areas
    var showtitleAnimation = TweenMax.from('.typographyTitle', 1, {
        autoAlpha: 0,
        y: "100",
        ease: Sine.easeOut
    }); //TweenMax
    var titleAnimationScene = new ScrollMagic.Scene({
            triggerHook: 1,
            triggerElement: '.showMapWeather',
            reverse: false
        })
        .setTween(showtitleAnimation)
        .addTo(controller) //controller
});






/**

"use strict";


//activate map via scroll event
var controller = new ScrollMagic.Controller();
var mapWeather = new ScrollMagic.Scene({
        triggerElement: "#intro1",
        reverse: false
    }) //mapWeather
    .setClassToggle('#intro1', 'showMapWeather')
    .addTo(controller);




//map and weather 
var runWeatherMap = function () {
    // Check to see if the browser supports the GeoLocation API.
    if (navigator.geolocation) {
        // Get the location
        navigator.geolocation.watchPosition(function (position) {

                //get the coordinates
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                var xhr,
                    city = 'lat=' + lat + '&lon=' + lon,
                    appId = 'APPID=81e6708dcd52386955430e6897e02992',
                    unitCelcius = 'units=metric',
                    weatherLang = 'lang=en',
                    weatherMode = ' mode=json',
                    openWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?' + city + '&' + appId + '&' + unitCelcius + '&' + weatherLang + '&' + weatherMode;
                //to make url dynamic so i can change each parameters in weather API
                var uriEnc = encodeURIComponent(openWeatherURL);
                var urlDec = decodeURIComponent(uriEnc);

                //calling map
                var map = L.map('mapId', {
                    center: [lat, lon],
                    zoom: 17,
                    scrollWheelZoom: false
                });

                //marker
                var mapMarker = L.icon({
                    iconUrl: 'img/assets/mapMarker.png',
                    iconSize: [32, 32], // size of the icon
                });
                var marker = L.marker([lat, lon], {
                    icon: mapMarker
                }).addTo(map);

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map); //tileLayer

                //for older broswser
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } //window.XMLHttpRequest            

                //function to convert UNIX timestamp
                function calcuTime(dynamicTime) {
                    // Create a new JavaScript Date object based on the timestamp
                    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                    var date = new Date(dynamicTime * 1000);
                    // Hours part from the timestamp
                    var hours = date.getHours();
                    //12 hour format
                    var hourFormat = hours >= 12 ? 'pm' : 'am';
                    // Minutes part from the timestamp
                    var minutes = "0" + date.getMinutes();
                    //get date todayTimeDate
                    var dateTodayIs = date.getDate();
                    //get day
                    var weekday = new Array(7);
                    weekday[0] = "Sun";
                    weekday[1] = "Mon";
                    weekday[2] = "Tue";
                    weekday[3] = "Wed";
                    weekday[4] = "Thur";
                    weekday[5] = "Fri";
                    weekday[6] = "Sat";
                    var exactDay = weekday[date.getDay()];

                    //get month
                    var month = new Array(7);
                    month[0] = "Jan";
                    month[1] = "Feb";
                    month[2] = "Mar";
                    month[3] = "Apr";
                    month[4] = "May";
                    month[5] = "Jun";
                    month[6] = "Jul";
                    month[7] = "Aug";
                    month[8] = "Sept";
                    month[9] = "Oct";
                    month[10] = "Nov";
                    month[11] = "Dec";
                    var exactMonth = month[date.getMonth()];
                    // Will display time in 10:30:23 format
                    var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + hourFormat;
                    return formattedTime;
                } //calcuTime  ---

                //clouds animation
                function toAnimateCloudsIcon() {
                    var cloud = document.getElementsByClassName('iconWeather');
                    var cloudsRandom = Math.floor((Math.random() * 30) + 1);
                    TweenMax.to(cloud, 5, {
                        x: cloudsRandom,
                        autoAlpha: 0.1,
                        repeat: -1,
                        repeatDelay: 1,
                        ease: Linear.easeIn
                    }, 0.5); //TweenMax	
                }
                //map marker animation
                function toAnimatemarKerMap() {
                    var markerMap = document.getElementsByClassName('leaflet-marker-icon');
                    TweenMax.from(markerMap, 2, {
                        autoAlpha: 1,
                        rotation: -10,
                        repeat: -1,
                        repeatDelay: 0.5,
                        ease: Linear.easeIn
                    }); //TweenMax	
                }

                //for handling success request
                xhr.onreadystatechange = function () {
                    if ((xhr.readyState === 4) && (xhr.status === 200)) {
                        var infoWeather = JSON.parse(xhr.responseText);
                        var dynamicDisplayingEl = '';

                        //Current weather data 
                        dynamicDisplayingEl = '<ul class="list-group">'
                        dynamicDisplayingEl += '<li class="list-group-item">' + '<h3>' + 'Weather in' + " " + infoWeather.name + ',' + infoWeather.sys.country + '</h3>'; + '</li>';
                        dynamicDisplayingEl += '<li class="list-group-item">' + '<p>' + '<img class="iconWeather" src="http://api.openweathermap.org/img/w/' + infoWeather.weather[0].icon + '.png" alt="' + infoWeather.weather[0].description + '"/>' + '<strong>' + infoWeather.main.temp.toPrecision(2) + " " + "°C" + '</strong>' + '</p>' + '</li>';
                        dynamicDisplayingEl += '<li class="list-group-item">' + infoWeather.weather[0].description + '</li>';
                        dynamicDisplayingEl += '</ul>';
                        document.getElementById('weather-container-info').innerHTML = dynamicDisplayingEl;


                        //table main weather information
                        var mainWeatherInformation = '';
                        mainWeatherInformation = '<div class="weatherEach">' +
                            '<table class="table table-bordered table-hover table-responsive">' +
                            '<tbody>' +

                            '<tr>' +
                            '<td>' + 'Wind' + '</td>' +
                            '<td>' + infoWeather.main.temp + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Cloudiness' + '</td>' +
                            '<td>' + infoWeather.clouds.all + '%' + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Pressure' + '</td>' +
                            '<td>' + infoWeather.main.pressure + " " + 'hPa' + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Humidity' + '</td>' +
                            '<td>' + infoWeather.main.humidity + " " + '%' + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Sunrise' + '</td>' +
                            '<td>' + calcuTime(infoWeather.sys.sunrise) + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Sunset ' + '</td>' +
                            '<td>' + calcuTime(infoWeather.sys.sunset) + '</td>' +
                            '</tr>' +

                            '<tr>' +
                            '<td>' + 'Geo coords' + '</td>' +
                            '<td>' + '[' + infoWeather.coord.lon + " " + infoWeather.coord.lat + ']' + '</td>' +
                            '</tr>' +

                            '</tbody>' +
                            '</table>'
                        mainWeatherInformation += '</div>';
                        var headerWeatherInfo = document.getElementById('weather-container');
                        headerWeatherInfo.innerHTML = mainWeatherInformation;

                        //set time out for the animation
                        setTimeout(toAnimateCloudsIcon, 1000);
                        setTimeout(toAnimatemarKerMap, 100);

                    } //xhr.readyState
                } //xhr.onreadystatechange

                //XMLHtppRequest methods
                xhr.open('GET', urlDec);
                xhr.send();


                //handling error if user wont grant location permission
            },
            function (error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        // User denied access to location. Perhaps redirect to alternate content?
                        alert('Permission was denied');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('Position is currently unavailable "\n" Check your internet connection.');
                        break;
                    case error.PERMISSION_DENIED_TIMEOUT:
                        alert('User took to long to grant/deny permission.');
                        break;
                    case error.UNKNOWN_ERROR:
                        alert('An unknown error occurred.')
                        break;
                }
            }); //navigator.geolocation.watchPosition

    } else {
        // Print out a message to the user.
        document.write('Your browser does not support GeoLocation');
    } //if else navigator.geolocation

} //runWeatherMap


//set timeout and call runWeatherMap 
setTimeout(runWeatherMap, 2000);



**/


/*
(function () {

    //get geolocation	
      setTimeout(function () {
          
           // Check to see if the browser supports the GeoLocation API.
        if (navigator.geolocation) {
            // Get the location
            navigator.geolocation.watchPosition(function (position) {
                var weatherLat = position.coords.latitude;
                var weatherLon = position.coords.longitude;
                var weatherRequest,
                    openApi = 'http://api.openweathermap.org',
                    forecast = '/data/2.5/forecast?',
                    appId = 'APPID=81e6708dcd52386955430e6897e02992',
                    unitCelcius = 'units=metric',
                    cityId = 'lat=' + weatherLat + '&lon=' + weatherLon,
                    weatherLang = 'lang=en',
                    weatherMode = ' mode=json',
                    andSign = '&',
                    openWeatherURL = openApi + forecast + andSign + cityId + andSign + appId + andSign + unitCelcius + andSign + weatherLang + andSign + weatherMode;
                //to make url dynamic so i can change each parameters in weather API
                var uriEnc = encodeURIComponent(openWeatherURL);
                var urlDec = decodeURIComponent(uriEnc);

                if (window.XMLHttpRequest) {
                    weatherRequest = new XMLHttpRequest();
                } else {
                    weatherRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } //if

                weatherRequest.onreadystatechange = function () {
                    if ((weatherRequest.readyState === 4) && (weatherRequest.status === 200)) {
                        var infoWeather = JSON.parse(weatherRequest.responseText);

                        var headerWeatherInfo = '<ul>';
                        headerWeatherInfo += '<li>' + '<img src="http://api.openweathermap.org/img/w/' + infoWeather.list[0].weather[0].icon + '.png" alt="' + infoWeather.list[0].weather[0].description + '"/>' + infoWeather.list[0].main.temp.toPrecision(2) + '°' + '</li>';
                        headerWeatherInfo += '<li>' + infoWeather.city.name + ',' + infoWeather.city.country + '<br>' + '3 days Weather Forecast' + '<li>';
                        headerWeatherInfo += '</ul>';
                        document.getElementById('weather-container-info').innerHTML = headerWeatherInfo;

                        var dynamicDisplayingEl = '';
                        for (var i = 0; i < infoWeather.list.length; i++) {

                            //timestamp conversion;
                            var todayTimeDate = infoWeather.list[i].dt;
                            // Create a new JavaScript Date object based on the timestamp
                            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                            var date = new Date(todayTimeDate * 1000);
                            // Hours part from the timestamp
                            var hours = date.getHours();
                            //12 hour format
                            var hourFormat = hours >= 12 ? 'pm' : 'am';
                            // Minutes part from the timestamp
                            var minutes = "0" + date.getMinutes();
                            //get date todayTimeDate
                            var dateTodayIs = date.getDate();
                            //get day
                            var weekday = new Array(7);
                            weekday[0] = "Sun";
                            weekday[1] = "Mon";
                            weekday[2] = "Tue";
                            weekday[3] = "Wed";
                            weekday[4] = "Thur";
                            weekday[5] = "Fri";
                            weekday[6] = "Sat";
                            var exactDay = weekday[date.getDay()];

                            //get month
                            var month = new Array(7);
                            month[0] = "Jan";
                            month[1] = "Feb";
                            month[2] = "Mar";
                            month[3] = "Apr";
                            month[4] = "May";
                            month[5] = "Jun";
                            month[6] = "Jul";
                            month[7] = "Aug";
                            month[8] = "Sept";
                            month[9] = "Oct";
                            month[10] = "Nov";
                            month[11] = "Dec";
                            var exactMonth = month[date.getMonth()];

                            // Will display time in 10:30:23 format
                            var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + hourFormat;


                            dynamicDisplayingEl += '<div class="weatherEach">' +
                                '<table class="table table-striped table-hover table-responsive">' +
                                '<tbody>' +
                                '<tr>' +
                                '<td>' + formattedTime + '  ' + exactDay + ' ' + dateTodayIs + ' ' + exactMonth + '</td>' +
                                '<td>' + infoWeather.list[i].main.temp.toPrecision(2) + '<strong>' + '°' + '<strong>' + '</td>' +
                                '<td>' + infoWeather.list[i].weather[0].description + '</td>' +
                                '<td>' + '<img class="iconWeather" src="http://api.openweathermap.org/img/w/' + infoWeather.list[i].weather[0].icon + '.png" alt="' + infoWeather.list[i].weather[0].description + '"/>' +
                                '</td>' +
                                '</tr>' +
                                '</tbody>' +
                                '</table>'
                            dynamicDisplayingEl += '</div>';
                            var displayingEl = document.getElementById('weather-container');
                            displayingEl.innerHTML = dynamicDisplayingEl;
                        } //for
                    }
                    //clouds animation
                    setTimeout(function () {
                        var cloud = document.getElementsByClassName('iconWeather');
                        var cloudsRandom = Math.floor((Math.random() * 30) + 1);
                        TweenMax.staggerTo('.iconWeather', 5, {
                            x: cloudsRandom,
                            autoAlpha: 0.1,
                            repeat: -1,
                            repeatDelay: 1,
                            ease: Linear.easeIn
                        }, 0.5); //TweenMax	
                    }, 1000); //animation cloud timeour							
                } //onreadystatechange
                weatherRequest.open('GET', urlDec);
                weatherRequest.send(); //send
            }); //if
        } else {
            // Print out a message to the user.
            var creatElement = document.createElement('div');
            var creatElementText = document.createTextNode('Refresh browser and allow us to get your location.  Your browser does not support GeoLocation');
            creatElement.appendChild(creatElementText)
            creatElement.classList.add('error-message-map');
            document.getElementById('#mapId').appendChild(creatElement);
        } //if else		    
    }, 2000); //setTimeout  
    /*}if*/
//})(); //function*/
