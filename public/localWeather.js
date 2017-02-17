// Open Weather API Key
// 8c76ac4e605f564e0e370e04b8fd3714


$(document).ready(function() {

	var currentLocation = {};

	function geoLocationInit() {

		if ("geolocation" in navigator) {

			var geo = navigator.geolocation;

			geo.getCurrentPosition(inputCoordinates);

		} else {
			console.log("Application doesn't have access to Navigator.");
		}

	}


	function inputCoordinates(pos) {

		var crd = pos.coords;
		var weather = {};

		currentLocation = {
			latitude: crd.latitude,
			longitude: crd.longitude
		};

		var lat = currentLocation.latitude;
		var lon = currentLocation.longitude;
		var coordinate = "lat=" + lat + '&lon=' + lon;
		var connectionString = "http://api.openweathermap.org/data/2.5/weather?" + coordinate + "&APPID=8c76ac4e605f564e0e370e04b8fd3714";

		$.ajax({
			type: "GET",
			url: connectionString,
			data: JSON,
			success: function(data){
				weather = {
					iconUrl: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
					main: data.main,
					name: data.name,
					country: data.sys.country,
					sunrise: data.sys.sunrise,
					sunset: data.sys.sunset
				}
			},
			async: false
		});

		var iconUrl = weather.iconUrl;
		var img = document.createElement("IMG");
		img.src = iconUrl;
		var oldImg = document.getElementById('oldImg');

		document.getElementById('imgDiv').replaceChild(img, oldImg);

		var tempKelvin = weather.main.temp;
		var tempCelsius = tempKelvin - 273.15;
		tempFahrenheit = (tempKelvin - 273.15) * 1.8 + 32;

		$('#tempCelsius').html(tempCelsius.toFixed(1) + " <sup>o</sup>C");

		$('#tempFahrenheit').html(tempFahrenheit.toFixed(1) + " <sup>o</sup>F");

		$('#toggleF').on('click', function(){
		$('#fahrenheit').toggle();
		$('#celsius').toggle();
		});

		$('#toggleC').on('click', function(){
		$('#fahrenheit').toggle();
		$('#celsius').toggle();
		});

	}

	geoLocationInit();
	

});

 
