var Gmaps = require('./../js/gmaps.js').Gmaps;
var apiKeyMaps = require('./../.env').apiKeyMaps;



$(document).ready(function() {
  var directionsService, directionsDisplay, map;

  $("#get-directions").submit(function(){
    event.preventDefault();
    var startPoint = $("#start-point").val();
    var endPoint = $("#end-point").val();
    newGmap.getDirections(startPoint, endPoint, displayDirections);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

  var mapInit = function() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 45.5230622, lng: -122.6764816},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    // var onChangeHandler = function() {
    // };
    //
    // document.getElementById('start-point').addEventListener('change', onChangeHandler);
    // document.getElementById('end-point').addEventListener('change', onChangeHandler);
  };

  var newGmap = new Gmaps();
  newGmap.getMap(mapInit);

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById('start-point').value,
      destination: document.getElementById('end-point').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  var displayDirections = function(response) {
    $("#gmap-output").show();
    $("#distance span").append(response.routes[0].legs[0].distance.text);
    $("#time span").append(response.routes[0].legs[0].duration.text);
    $("#startLocation span").text(response.routes[0].legs[0].start_address);
    $("#endLocation span").text(response.routes[0].legs[0].end_address);
    var travelSteps = response.routes[0].legs[0].steps;
    console.log(travelSteps);
    travelSteps.forEach(function(e){
      $("#steps").append("<div class='turn-directions'>"+JSON.stringify(e.html_instructions).replace(/""/, "")+"</div>");
      console.log('google loop'+ e.html_instructions );
    });
    console.log(response.routes[0].legs[0].distance);
    console.log(response.routes[0].legs[0].start_address);
    console.log(response);
  };
});

