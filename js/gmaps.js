var apiKeyMaps = require('./../.env').apiKeyMaps;
//Constructor

function Gmaps() {
  // this.city = city;
}

//Methods
Gmaps.prototype.getDirections = function(startPoint, endPoint, displayDirections){
  console.log("gmaps js");
  $.get("https://maps.googleapis.com/maps/api/directions/json?origin="+startPoint+",&destination="+endPoint+"&key="+apiKeyMaps)
    .then(function(response){
      displayDirections(response);
  });
  //return destination;
};

Gmaps.prototype.getMap = function(mapInit){
  $.getScript("https://maps.googleapis.com/maps/api/js?key="+apiKeyMaps)
      .then(function(){
    mapInit();
  });
};

//Exports
exports.Gmaps = Gmaps;
