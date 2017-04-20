var Gmaps = require('./../js/gmaps.js').Gmaps;
var apiKeyMaps = require('./../.env').apiKeyMaps;


$(document).ready(function() {
  $("#gmap-output").hide();

  $("#get-directions").submit(function(){
    event.preventDefault();
    var startPoint = $("#start-point").val();
    var endPoint = $("#end-point").val();
    var newGmap = new Gmaps();
    newGmap.getDirections(startPoint, endPoint, displayDirections);
  });


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
  }
});
