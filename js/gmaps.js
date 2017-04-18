
//Constructor
function gMaps(city) {
  this.city = city;
}

//Methods
Gmaps.prototype.gMethod = function(destination){
  console.log("gmaps js");
  return destination;
}

//Exports
exports.gmapsExport = gMaps;
