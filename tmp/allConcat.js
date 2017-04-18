var Gmaps = require('./../js/gmaps.js').gMaps;
var mapAPI = "AIzaSyD0mVK00MYnVC-pBDpmSa0juXXVwOuDhXs";

$(document).ready(function() {
  console.log("gmaps ready");
  $("#gmap-output").hide();
  $("#get-directions").click(function(){
    var startPoint = $("#start-point").val();
    var endPoint = $("#end-point").val();
    $.get("https://maps.googleapis.com/maps/api/directions/json?origin="+startPoint+",&destination="+endPoint+"&key="+mapAPI).then(function(response){
      if(response){
        $("#gmap-output").show();
        $("#distance span").append(response.routes[0]['legs'][0]['distance'].text);
        $("#time span").append(response.routes[0]['legs'][0]['duration'].text);
        $("#startLocation span").text(response.routes[0]['legs'][0]['start_address']);
        $("#endLocation span").text(response.routes[0]['legs'][0]['end_address']);
        var travelSteps = response.routes[0]['legs'][0]['steps'];
        console.log(travelSteps);
        travelSteps.forEach(function(e){
          $("#steps").append("<div class='turn-directions'>"+JSON.stringify(e['html_instructions']).replace(/""/, "")+"</div>");
          console.log('google loop'+ e['html_instructions'] );
        });
        console.log(response.routes[0]['legs'][0]['distance']);
        console.log(response.routes[0]['legs'][0]['start_address']);
        console.log(response);
      };
    });
  });
});
