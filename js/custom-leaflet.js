    //get geolocation	
    window.onload = function () {

        setTimeout(function () {
            // Check to see if the browser supports the GeoLocation API.
            if (navigator.geolocation) {
                // Get the location
                navigator.geolocation.watchPosition(function (mapPosition) {
                    var weatherLat = mapPosition.coords.latitude;
                    var weatherLon = mapPosition.coords.longitude;
                    var map = L.map('mapId', {
                        center: [weatherLat, weatherLon],
                        zoom: 17,
                        scrollWheelZoom: false
                    });

                    //marker
                    var mapMarker = L.icon({
                        iconUrl: 'img/assets/mapMarker.png',
                        iconSize: [32, 32], // size of the icon
                    });
                    var marker = L.marker([weatherLat, weatherLon], {
                        icon: mapMarker
                    }).addTo(map);

                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map); //tileLayer
                }); //if
            } else {
                // Print out a message to the user.
                document.write('Your browser does not support GeoLocation :(');
            }
        }, 2000); //seTimeOut
    } //onload