
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
