/*global google, navigator*/

var destCoords, tilt, tiltInitial;

if (window.DeviceOrientationEvent)
window.addEventListener('deviceorientation', function(eventData) {
	window.tilt = {roll: eventData.gamma, pitch: eventData.beta, yaw: eventData.alpha};
	
	//window.tilt...
	
	if(!window.tiltInitial) window.tiltInitial = window.tilt;
}, false);
else
	alert("DeviceOrientationEvent is not supported.");

//Google maps JSONP callback
function initAutocomplete() {
	// Create the search box and link it to the UI element.
	var input = document.getElementById('to');
	var searchBox = new google.maps.places.Autocomplete(input);
	
	google.maps.event.addListener(searchBox, 'place_changed', function() {//an extra s can be a pain in the as
		window.destCoords = searchBox.getPlace().geometry.location; //latitude, longitude
	});
}

if (navigator.geolocation)
	navigator.geolocation.watchPosition(position => coordListener.updateCoords(window.coordListener.currentCoords = position.coords)); //latitude, longitude
else
	alert("Geolocation is not supported by this browser.");

/*global $*/

function CoordListenerClass(){
	var me = this;
	this.listeners = [];
	this.events = {};
	this.currentCoords = {};
	this.getDirectionToGo = function(){
		if(this.listeners.length)
			return {
				latitude: this.listeners[0].coords.latitude - this.currentCoords.latitude,
				longitude: this.listeners[0].coords.longitude - this.currentCoords.longitude
			};
	};
	this.updateCoords = function(coords){
		this.currentCoords = coords;
		if(this.listeners[0]){
			if(this.listeners[0](coords)){
				var reached = this.listeners.shift().coords;
				this.trigger('waypoint', reached);
			}
		}
	};
	this.on = function(evt, f){
		if(!this.events[evt])
			this.events[evt] = [];
		this.events[evt].push(f);
	};
	this.trigger = function(evt, ...args){
		if(this.events[evt])
			this.events[evt].forEach(function(f){
				f.apply(me, args);
			});
	};
	this.begin = function(){
		getDestinations().then(function(destinations){
			destinations.forEach(function(dest){
				var listener = function(coords){
					if(coords.latitude - dest.coords.latitude < 0.0001
						&& coords.longitude - dest.coords.longitude < 0.0001) //if within ten meters
						return true;
					else
						return false;
				};
				listener.coords = dest.coords;
				this.listeners.push();
			});
		});
	};
	this.end = function(){
		this.listeners = [];
	};
};
window.coordListener = new CoordListenerClass();
/*$(function(){
window.coordListener.begin();
window.coordListener.on('waypoint', function(coords){
	console.log("Reached waypoint");
});});*/

/*function getDestinations(){
	return new Promise(function(resolve, reject){
		$.getJSON("https://maps.googleapis.com/maps/api/directions/json", {
		    origin: window.coordListener.currentCoords.latitude+","+window.coordListener.currentCoords.longitude,	//CURRENT LOCATION.
		    destination: destCoords.latitude+","+destCoords.longitude,	//FROM INPUT BOX.
		    key: "AIzaSyDfvQr_Z4eE2BKUxYE-u6tIt9GV_yhoIj8"
		}, function(json){
			var resolution = [];
		    json.routes[0].legs.forEach(function(leg){
	            resolution.push(resolution.push({latitude: leg.end_location.lat, longitude: leg.end_location.long}));
	        });
	        resolve(resolution);
		});
	});
}*/