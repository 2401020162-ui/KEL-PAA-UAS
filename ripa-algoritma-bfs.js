/**
 * =====================================================
 *  ANGGOTA 3 — NABIILAH RIFA MUSYIFA
 *  Modul: Algoritma BFS
 *  Fungsi: bfs(), highlightNode()
 * =====================================================
 */

/**
 * Menjalankan algoritma Breadth-First Search (BFS)
 * dari node startId menuju endId.
 *
 * Bergantung pada adj (adjacency list) dari azalea-struktur-data.js.
 *
 * @param {string} startId - ID node awal
 * @param {string} endId   - ID node tujuan
 * @returns {{ steps: object[], foundPath: string[]|null }}
 *   steps     : rekaman setiap langkah untuk keperluan animasi
 *   foundPath : urutan ID node dari start ke end, atau null jika tidak ditemukan
 */
function bfs(startId, endId) {
  const visited = new Set([startId]);
  const queue = [
    {
      node: startId,
      path: [startId]
    }
  ];

  const steps = [];
  let foundPath = null;

  while (queue.length) {
    const cur = queue.shift();

    steps.push({
      node: cur.node,
      queueLen: queue.length,
      path: cur.path
    });

    if (cur.node === endId) {
      foundPath = cur.path;
      break;
    }

    for (const nextNode of adj[cur.node] || []) {
      if (!visited.has(nextNode)) {
        visited.add(nextNode);
        queue.push({
          node: nextNode,
          path: [...cur.path, nextNode]
        });
      }
    }
  }

  return { steps, foundPath };
}

/**
 * Mengubah warna ikon marker pada peta berdasarkan tipe status node.
 *
 * Bergantung pada nodeMarkers dari sadil-visualisasi-peta.js.
 *
 * @param {string} id   - ID node (A-H)
 * @param {string} type - 'active' | 'start' | 'end' | 'path' | 'normal'
 */
function highlightNode(id, type = 'normal') {
  const marker = nodeMarkers[id];
  if (!marker) return;

  const iconElement = marker.getElement();
  if (!iconElement) return;

  const el = iconElement.querySelector('.node-label');
  if (!el) return;

  if (type === 'active') {
    el.style.background = '#60A5FA';
    el.style.color = '#000';
  } else if (type === 'start') {
    el.style.background = '#16a34a';
    el.style.color = '#fff';
  } else if (type === 'end') {
    el.style.background = '#dc2626';
    el.style.color = '#fff';
  } else if (type === 'path') {
    el.style.background = '#185FA5';
    el.style.color = '#fff';
  } else {
    // 'normal' — warna default hitam
    el.style.background = '#111';
    el.style.color = '#fff';
  }
}
