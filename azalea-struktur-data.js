/**
 * =====================================================
 *  ANGGOTA 1 — shalsabyla finta azalea
 *  Modul: Struktur Data
 *  Fungsi: getNode(), initGraph()
 * =====================================================
 */

const NODES = [
  {
    id: 'A',
    lat: 0.923450,
    lng: 104.512200,
    name: 'Cooler City Central Kencana',
    road: 'Jl. Tanjung Uban Lama',
    label: 'A'
  },
  {
    id: 'B',
    lat: 0.922690,
    lng: 104.511450,
    name: 'Mr Blitz Batu 10',
    road: 'Jalur dari Cooler City',
    label: 'B'
  },
  {
    id: 'C',
    lat: 0.921260,
    lng: 104.511040,
    name: 'Simpang Kedai Kopi Batu 10',
    road: 'Simpang menuju lorong',
    label: 'C'
  },
  {
    id: 'D',
    lat: 0.920620,
    lng: 104.510080,
    name: 'Lorong Vicha',
    road: 'Lorong Vicha',
    label: 'D'
  },
  {
    id: 'E',
    lat: 0.919210,
    lng: 104.509550,
    name: 'Masjid Al-Uswah',
    road: 'Jalur Masjid Al-Uswah',
    label: 'E'
  },
  {
    id: 'F',
    lat: 0.918460,
    lng: 104.508570,
    name: 'Pinang Lestari Swalayan',
    road: 'Jalur menuju D.I. Panjaitan',
    label: 'F'
  },
  {
    id: 'G',
    lat: 0.917300,
    lng: 104.509360,
    name: 'Kimia Farma Bintan Center',
    road: 'Area dekat D.I. Panjaitan',
    label: 'G'
  },
  {
    id: 'H',
    lat: 0.917720,
    lng: 104.509760,
    name: 'Momoyo Ice Cream',
    road: 'Jl. D.I. Panjaitan',
    label: 'H'
  }
];

const EDGES = [
  { from: 'A', to: 'B' },
  { from: 'B', to: 'C' },
  { from: 'C', to: 'D' },
  { from: 'D', to: 'E' },
  { from: 'E', to: 'F' },
  { from: 'F', to: 'G' },
  { from: 'G', to: 'H' }
];

const COLOR_BFS = '#185FA5';

// Adjacency list — diisi oleh initGraph()
const adj = {};

/**
 * Mengembalikan objek node berdasarkan ID (huruf A-H).
 * @param {string} id
 * @returns {object|undefined}
 */
function getNode(id) {
  return NODES.find(n => n.id === id);
}

/**
 * Membangun adjacency list (graf) dari array NODES dan EDGES.
 * Graf bersifat undirected: setiap edge ditambahkan dua arah.
 */
function initGraph() {
  NODES.forEach(n => {
    adj[n.id] = [];
  });

  EDGES.forEach(({ from, to }) => {
    adj[from].push(to);
    adj[to].push(from);
  });
}
