// Initialize the map
var map = L.map("map", {
  zoomControl: true,
  scrollWheelZoom: true,
  minZoom: 2,
}).setView([30, 0], 2);

// Add terrain map tiles with user's token
L.tileLayer(
  "https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=kfRL4rOIWTzc6Az1L1sjbO2sSFUPJ9OCg2pTJXIsKydUtAj7J5dSdht0LBYY1qyO",
  {
    attribution:
      '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; Jawg</a>',
    minZoom: 0,
    maxZoom: 22,
  }
).addTo(map);

// Apply custom styling to map
document.querySelector(".leaflet-tile-pane").style.filter =
  "brightness(0.8) contrast(1.2) saturate(1.2)";

// Custom icon for markers
var customIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Add markers for each location
var locations = [
  {
    name: "Osaka",
    coords: [34.6937, 135.5023],
    address: "1-1-88 Oyodonaka, Kita-ku<br>Osaka 531-0076, Japan",
  },
  {
    name: "Okinawa",
    coords: [26.2124, 127.6809],
    address: "3-1-12 Makishi, Naha City<br>Okinawa 900-0013, Japan",
  },
  {
    name: "Lima",
    coords: [-12.0464, -77.0428],
    address: "Av. La Mar 1337, Miraflores<br>Lima 15074, Peru",
  },
  {
    name: "İstanbul",
    coords: [41.0082, 28.9784],
    address: "Kuruçeşme Mah. Muallim Naci Cad.<br>No: 64/A Beşiktaş, İstanbul",
  },
];

// Add markers with custom popups
locations.forEach(function (loc) {
  var popup = L.popup({
    className: "custom-popup",
    closeButton: false,
  }).setContent(
    '<div class="popup-content">' +
      "<h3>" +
      loc.name +
      "</h3>" +
      "<p>" +
      loc.address +
      "</p>" +
      '<button class="scroll-to-location" data-location="' +
      loc.name.toLowerCase() +
      '">Detayları Gör</button>' +
      "</div>"
  );

  var marker = L.marker(loc.coords, { icon: customIcon })
    .bindPopup(popup)
    .addTo(map);

  // Add click event to marker
  marker.on("click", function () {
    setTimeout(function () {
      var locationId = loc.name.toLowerCase();
      if (locationId === "istanbul") locationId = "istanbul";
      else if (locationId === "lima") locationId = "peru";

      var element = document.getElementById(locationId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("highlight");
        setTimeout(function () {
          element.classList.remove("highlight");
        }, 2000);
      }
    }, 300);
  });
});

// Add click event for popup buttons
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("scroll-to-location")) {
    var locationId = e.target.getAttribute("data-location");
    if (locationId === "istanbul") locationId = "istanbul";
    else if (locationId === "lima") locationId = "peru";

    var element = document.getElementById(locationId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("highlight");
      setTimeout(function () {
        element.classList.remove("highlight");
      }, 2000);
    }
  }
});
