maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.PASTEL,
  center: coordinates,
  zoom: 12
});

// Create marker element
const markerEl = document.createElement("div");
markerEl.className = "custom-marker";

markerEl.innerHTML = `<i class="fa-solid fa-house"></i>`;

new maptilersdk.Marker({ element: markerEl })
  .setLngLat(coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 })
      .setHTML(`<h6>${listingTitle}</h6><p>${listingLocation}</p>`)
  )
  .addTo(map);