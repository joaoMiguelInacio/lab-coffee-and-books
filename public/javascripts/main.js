var markers = [];
var map;

window.addEventListener('load', () => {
  const azeda = {
    lat: 40.90,
    lng: -8.49
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: azeda
  });
  getPlaces();
});

function getPlaces() {
  axios
    .get('/places/api')
    .then(response => {
      placePlaces(response.data.places);
    })
    .catch(error => {
      console.log(error);
    });
}

function placePlaces(places) {
  for (let place of places) {
    const center = {
      lat: place.location.coordinates[1],
      lng: place.location.coordinates[0]
    };
    const pin = new google.maps.Marker({
      position: center,
      map: map,
      title: place.name
    });
    markers.push(pin);
  }
}