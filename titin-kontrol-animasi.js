/**
 * =====================================================
 *  ANGGOTA 5 — Christine Simbolon
 *  Modul: Kontrol Sistem & Animasi
 *  Fungsi: run(), stopAnimation(), endAnimation(),
 *          resetVisualization(), resetAll(), checkReady()
 * =====================================================
 */

// State animasi
let animTimeouts = [];
let isRunning    = false;

/**
 * Memeriksa apakah tombol "Cari Rute" boleh diaktifkan.
 * Tombol dinonaktifkan jika titik awal atau tujuan belum dipilih,
 * atau jika keduanya sama.
 */
function checkReady() {
  const s = document.getElementById('sel-start').value;
  const e = document.getElementById('sel-end').value;

  document.getElementById('btn-run').disabled = (s === '' || e === '' || s === e);
}

/**
 * Menjalankan keseluruhan proses: mengambil input, memanggil BFS,
 * lalu memainkan animasi langkah demi langkah sesuai kecepatan yang dipilih.
 *
 * Bergantung pada:
 *   - bfs(), highlightNode()        → ripa-algoritma-bfs.js
 *   - drawRoute()                   → sadil-visualisasi-peta.js
 *   - hitungTotalJarak(), formatJarak() → rida-perhitungan-jarak.js
 *   - getNode()                     → azalea-struktur-data.js
 */
function run() {
  if (isRunning) return;

  resetVisualization();

  const startId = document.getElementById('sel-start').value;
  const endId   = document.getElementById('sel-end').value;
  const delay   = parseInt(document.getElementById('sel-speed').value);

  if (!startId || !endId || startId === endId) return;

  isRunning = true;

  document.getElementById('btn-run').disabled = true;
  document.getElementById('btn-stop').classList.add('visible');
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('live-panel').classList.add('active');
  document.getElementById('pulse').className = 'pulse-dot';
  document.getElementById('status-text').innerText =
    `BFS mencari rute dari ${startId} ke ${endId}...`;

  highlightNode(startId, 'start');
  highlightNode(endId,   'end');

  const { steps, foundPath } = bfs(startId, endId);

  steps.forEach((st, i) => {
    const t = setTimeout(() => {
      document.getElementById('step-counter').innerText =
        `NODE KE-${i + 1} DARI ${steps.length}`;

      if (st.node !== startId && st.node !== endId) {
        highlightNode(st.node, 'active');
      }

      document.getElementById('bfs-visited').innerText = `${i + 1} titik diperiksa`;
      document.getElementById('bfs-queue').innerText   = `antrian cabang: ${st.queueLen}`;
      document.getElementById('bfs-bar').style.width   =
        `${((i + 1) / steps.length) * 100}%`;

      if (i === steps.length - 1) {
        if (foundPath) {
          foundPath.forEach(id => {
            if (id !== startId && id !== endId) {
              highlightNode(id, 'path');
            }
          });

          drawRoute(foundPath);

          const totalJarak = hitungTotalJarak(foundPath);

          document.getElementById('result').style.display = 'flex';
          document.getElementById('result').innerHTML = `
            <div class="panel-sec">
              <div class="rcard">
                <div class="atag"><span class="dot"></span>BFS Sukses</div>
                <div class="lbl">Rute Terpendek Ditemukan</div>
                <div class="val">${foundPath.join(' → ')}</div>
                <div class="lbl" style="margin-top:10px;">Total Jarak</div>
                <div class="val">${formatJarak(totalJarak)}</div>
              </div>

              <div class="rcard">
                <div class="lbl">Detail rute</div>
                <ol class="route-list">
                  ${foundPath.map(id => {
                    const n = getNode(id);
                    return `<li><b>${n.id}</b> - ${n.name} <span style="color:#888">(${n.road})</span></li>`;
                  }).join('')}
                </ol>
              </div>
            </div>
          `;
        }

        endAnimation('Pencarian BFS selesai.');
      }
    }, i * delay);

    animTimeouts.push(t);
  });
}

/**
 * Menghentikan animasi yang sedang berjalan secara paksa.
 */
function stopAnimation() {
  animTimeouts.forEach(clearTimeout);
  animTimeouts = [];

  endAnimation('Animasi BFS dihentikan.');
}

/**
 * Mengakhiri sesi animasi: mereset flag isRunning,
 * menyembunyikan tombol Stop, dan memperbarui status bar.
 * @param {string} msg - Pesan yang ditampilkan di status bar
 */
function endAnimation(msg) {
  isRunning = false;

  document.getElementById('btn-stop').className = '';
  checkReady();
  document.getElementById('pulse').className       = 'pulse-dot idle';
  document.getElementById('status-text').innerText = msg;
}

/**
 * Mereset tampilan peta dan panel (tanpa mereset dropdown pilihan).
 * Menghapus rute, warna node, progress bar, dan hasil.
 *
 * Bergantung pada:
 *   - NODES, routeLine, nodeMarkers → azalea/sadil
 *   - highlightNode()               → ripa-algoritma-bfs.js
 */
function resetVisualization() {
  animTimeouts.forEach(clearTimeout);
  animTimeouts = [];

  if (routeLine) {
    map.removeLayer(routeLine);
    routeLine = null;
  }

  NODES.forEach(n => highlightNode(n.id, 'normal'));

  document.getElementById('bfs-bar').style.width    = '0%';
  document.getElementById('bfs-visited').innerText  = '0 titik diperiksa';
  document.getElementById('bfs-queue').innerText    = 'antrian cabang: 0';
  document.getElementById('step-counter').innerText = '';
  document.getElementById('result').style.display   = 'none';
  document.getElementById('result').innerHTML       = '';
}

/**
 * Mereset semua: menghentikan animasi, membersihkan tampilan,
 * mengembalikan dropdown ke nilai default, dan menyesuaikan peta.
 *
 * Bergantung pada NODES, map dari sadil-visualisasi-peta.js.
 */
function resetAll() {
  stopAnimation();
  resetVisualization();

  document.getElementById('sel-start').value = 'A';
  document.getElementById('sel-end').value   = 'H';
  document.getElementById('empty-state').style.display = 'block';
  document.getElementById('live-panel').classList.remove('active');
  document.getElementById('status-text').innerText =
    'Pilih titik awal dan tujuan untuk memulai.';

  const bounds = L.latLngBounds(NODES.map(n => [n.lat, n.lng]));
  map.fitBounds(bounds, { padding: [60, 60] });

  checkReady();
}
