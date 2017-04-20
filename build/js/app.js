(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKeyMaps = "AIzaSyD0mVK00MYnVC-pBDpmSa0juXXVwOuDhXs";

},{}],2:[function(require,module,exports){
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

//Exports
exports.Gmaps = Gmaps;

},{"./../.env":1}],3:[function(require,module,exports){
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

function initMap() {
  var portland = {lat: 45.5230622, lng: -122.6764816};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: portland
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

},{"./../.env":1,"./../js/gmaps.js":2}]},{},[3]);
