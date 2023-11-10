import {API_URL} from "../../settings.js"
const URL = API_URL + "/worldmap"

import { sanitizeStringWithTableRows } from "../../utils.js";

export async function initWorldMap(){
  if (!document.getElementById('map')) {
    console.error('Map element not found!');
    return;
  }
}
//Init map and starting point, zoom level when map loaded
var map = L.map('map').setView([55.645533, 12.624538], 10);


//Getting map from external endpoint
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//------------------ Testing points on map------------------------------
var marker1 = L.marker([55.645533, 12.624538]).addTo(map);
marker1.bindPopup("<b>Halløj</b><br>Her bor Lotte").openPopup();

var circle = L.circle([55.672502546724594, 12.521517276763916], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);
circle.bindPopup("Købenahvns Zoo");

var polygon = L.polygon([
  [55.633422750940376, 12.733154296875002],
  [55.60860840190929, 12.784309387207033],
  [55.67158290073247, 12.769546508789062]
]).addTo(map);
polygon.bindPopup("Saltholm<br>Vildtreservat");

var popup = L.popup()
    .setLatLng([55.69185849757675, 12.554272413253786])
    .setContent("Vi burde måske arbejde lidt mere!")
    .openOn(map);

// map.on('click', function(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// });

var marker2 = L.marker([50.4501, 30.5234]).addTo(map);
marker2.bindPopup('Kyiv, Ukraine is the birthplace of Leaflet!');
// ---------------------------------------------------------------------------------


// Define the variable to hold the GeoJSON layer
var geojsonLayer; 

fetch('countries.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Create a GeoJSON layer and add it to the map
    geojsonLayer = L.geoJSON(data, {
      onEachFeature: onEachFeature
    }).addTo(map);
  });

  // Function to highlight the feature on mouseover
function highlightFeature(e) {
  var layer = e.target;

  // Style for highlighting, when mouseover
  layer.setStyle({
    weight: 3,
    color: '#FFF',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  // Show the popup with countryname
  var popup = L.popup()
    .setLatLng(e.latlng) 
    .setContent('Country: ' + layer.feature.properties.GEOUNIT)
    .openOn(layer._map);
}

// Function to reset the highlight, when mouse away
function resetHighlight(e) {
  geojsonLayer.resetStyle(e.target);
  e.target._map.closePopup(); // Close the popup
}

// Function to zoom to the feature
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}


// Function to be called on each feature
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: getReply
  });
}

// Define what to send to backend, GEOUNIT is countryname, lots of other info in countries.json file to fetch
function getReply(e){
  var layer = e.target;
  var countryName = layer.feature.properties.GEOUNIT;
  getInfo(countryName);
}

async function getInfo(countryName){
  const URL = `${API_URL}animal?answer=${countryName}`;
  const answerFromMap = document.getElementById('answerFromMap');
  answerFromMap.innerText = ""
    try {
      const response = await fetch(URL);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const reply = await response.json();
      answerFromMap.innerText = reply.answer;
  } catch (e) {
      answerFromMap.style.color = "red";
      answerFromMap.innerText = e.message;
  }
}


//To se countries.json file content, remove GEOUNIT to se all info to fetch
fetch('./countries.json')
  .then(response => response.json())
  .then(geojsonData => {
    geojsonData.features.forEach((feature) => {
      console.log(feature.properties.GEOUNIT);
    });
  })
  .catch(error => console.error('Error loading the GeoJSON data:', error));

