var Gmaps = require('./../js/gmaps.js').Gmaps;
var apiKeyMaps = require('./../.env').apiKeyMaps;
var wayPointsArray = [];
var newGmap = new Gmaps();
newGmap.getMap();
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;

var mapInit = function() {
 var map = new google.maps.Map(document.getElementById('map'), {
   zoom: 11,
   center: {lat: 45.5230622, lng: -122.6764816},
   mapTypeId: google.maps.MapTypeId.ROADMAP
 });
 directionsDisplay.setMap(map);
};

var wayPointsArray = [];


$(".addWaypoint").click(function(){
  var newWayPoint = "<div><label>Enter A Starting Location</label><input class='waypoint' type='text' autocomplete='on' required></div>";
  $("#wayPoints").append(newWayPoint);
});

$("#get-directions").submit(function(){
  event.preventDefault();
  $(".waypoints").each(function(location){
    waypoints.push(location);
  });
  calculateAndDisplayRoute(directionsService, directionsDisplay);
});

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: "215 SE Grand Ave, Portland, OR 97214, USA",
    destination: wayPointsArray[wayPointsArray.length - 1],
    waypoints: wayPointsArray,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};


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
