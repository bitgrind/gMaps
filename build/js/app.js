(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

//Constructor
function Gmaps(city) {
  this.city = city;
}

//Methods
Gmaps.prototype.gMethod = function(destination){
  console.log("gmaps js");
  //return destination;
};

//Exports
exports.gmapsExport = Gmaps;

},{}],2:[function(require,module,exports){
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

},{"./../js/gmaps.js":1}]},{},[2]);
