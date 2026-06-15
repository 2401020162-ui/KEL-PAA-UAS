/**
 * =====================================================
 *  ANGGOTA 4 — SADIL
 *  Modul: Visualisasi Peta
 *  Fungsi: makeNodeIcon(), initMap(), drawBaseEdges(), drawRoute()
 * =====================================================
 */

// Variabel global peta — digunakan modul lain
let map;
let nodeMarkers = {};
let edgeLines    = [];
let routeLine    = null;

/**
 * Membuat ikon lingkaran berlabel untuk marker Leaflet.
 * @param {string} letter - Huruf yang ditampilkan di ikon (A-H)
 * @returns {L.DivIcon}
 */
function makeNodeIcon(letter) {
  return L.divIcon({
    className: '',
    html: `<div class="node-label">${letter}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
}

/**
 * Menginisialisasi peta Leaflet + OpenStreetMap,
 * menambahkan semua marker node, lalu menyesuaikan tampilan (fitBounds).
 *
 * Bergantung pada NODES, EDGES dari azalea-struktur-data.js
 * dan fungsi drawBaseEdges() di file ini.
 */
function initMap() {
  map = L.map('map', {
    zoomControl: false
  });

  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  drawBaseEdges();

  NODES.forEach(n => {
    const marker = L.marker([n.lat, n.lng], {
      icon: makeNodeIcon(n.label)
    })
    .addTo(map)
    .bindPopup(`<b>${n.label} - ${n.name}</b><br>${n.road}`);

    nodeMarkers[n.id] = marker;
  });

  const bounds = L.latLngBounds(NODES.map(n => [n.lat, n.lng]));
  map.fitBounds(bounds, {
    padding: [60, 60]
  });
}

/**
 * Menggambar semua edge dasar (jaringan jalan abu-abu)
 * sebagai polyline di atas peta.
 *
 * Bergantung pada EDGES, getNode() dari azalea-struktur-data.js.
 */
function drawBaseEdges() {
  EDGES.forEach(({ from, to }) => {
    const p1 = getNode(from);
    const p2 = getNode(to);

    const line = L.polyline(
      [
        [p1.lat, p1.lng],
        [p2.lat, p2.lng]
      ],
      {
        color: '#c8c3b8',
        weight: 3,
        opacity: 0.85
      }
    ).addTo(map);

    edgeLines.push(line);
  });
}

/**
 * Menggambar garis rute hasil BFS di atas peta dengan warna biru.
 * Menghapus rute lama jika ada sebelum menggambar yang baru.
 *
 * Bergantung pada COLOR_BFS dari azalea-struktur-data.js
 * dan getNode() dari azalea-struktur-data.js.
 *
 * @param {string[]} path - Array ID node yang membentuk rute
 */
function drawRoute(path) {
  if (routeLine) {
    map.removeLayer(routeLine);
  }

  const coords = path.map(id => {
    const node = getNode(id);
    return [node.lat, node.lng];
  });

  routeLine = L.polyline(coords, {
    color: COLOR_BFS,
    weight: 7,
    opacity: 0.95
  }).addTo(map);

  map.fitBounds(routeLine.getBounds(), {
    padding: [60, 60]
  });
}
