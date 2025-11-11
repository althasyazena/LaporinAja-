/**
 * Map Terdiri Dari 2 Layer
 * Layer 1 : Peta/Map
 * Layer 2 : Marker/Pin
 */

let map;
let marker = []

// Melakukan Inisialisais (Menampilkan Map)
function initMap() {
    map = L.map('map').setView([-6.2, 106.8], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    renderMapMarkers();
}

// Menambahkan Marker
function renderMapMarkers() {
    if (!map) return;

    reports.forEach((r) => {
        const marker = L.marker([r.coordinates.lat, r.coordinates.lng])
            .addTo(map)
            .bindPopup(`<b>${r.title}</b>`)
            .openPopup();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initMap();
})