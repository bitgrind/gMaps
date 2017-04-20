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
