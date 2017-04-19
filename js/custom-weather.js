(function () {

    //get geolocation	
    setTimeout(function () {

        var $userCity = document.getElementById('userCity');
        $userCity.addEventListener('keyup', function () {
            console.log($userCity.value);
        }); //$userCity

        //search bar to fix the weather information
        var searchCity = $('#search-city').height();
        $('#weather-container-info').css('marginTop', searchCity);

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
                    cityGeolocation = 'lat=' + weatherLat + '&lon=' + weatherLon,
                    weatherLang = 'lang=en',
                    weatherMode = ' mode=json',
                    andSign = '&',
                    openWeatherURL = openApi + forecast + andSign + cityGeolocation + andSign + appId + andSign + unitCelcius + andSign + weatherLang + andSign + weatherMode;
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
        } //if navigator 	    
    }, 500); //setTimeout  
    /*}if*/
})(); //function




/*
(function () {

    //get geolocation	
      setTimeout(function () {
          
          
        var $userCity = document.getElementById('userCity');
        $userCity.addEventListener('keyup', function(){
            console.log($userCity.value);
        });//$userCity

        //search bar to fix the weather information
        var searchCity = $('#search-city').height();
        $('#weather-container-info').css('marginTop', searchCity);

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
/*})();*/ //function*/
