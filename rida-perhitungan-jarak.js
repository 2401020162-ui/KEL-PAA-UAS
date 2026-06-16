/**
 * =====================================================
 *  ANGGOTA 2 — RIDA
 *  Modul: Perhitungan Jarak
 *  Fungsi: hitungJarakKm(), hitungTotalJarak(), formatJarak()
 * =====================================================
 */

/**
 * Menghitung jarak antara dua koordinat menggunakan rumus Haversine.
 * Hasil dalam satuan kilometer (km).
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @returns {number} jarak dalam km
 */
function hitungJarakKm(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius bumi dalam km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Menjumlahkan total jarak dari sebuah path (array ID node).
 * Bergantung pada getNode() dari azalea-struktur-data.js.
 * @param {string[]} path - array ID node, mis. ['A','B','C']
 * @returns {number} total jarak dalam km
 */
function hitungTotalJarak(path) {
  let total = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const p1 = getNode(path[i]);
    const p2 = getNode(path[i + 1]);

    total += hitungJarakKm(p1.lat, p1.lng, p2.lat, p2.lng);
  }

  return total;
}

/**
 * Memformat angka jarak menjadi string dengan 2 desimal + satuan "km".
 * @param {number} km
 * @returns {string} mis. "1.23 km"
 */
function formatJarak(km) {
  return `${km.toFixed(2)} km`;
}
