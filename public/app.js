let player;

// ฟังก์ชันสร้างหรือสั่งเล่นเพลง
function playSong(videoId) {
  const container = document.getElementById('player');

  // ถ้ายังไม่มี Player หรือโหลดไม่ติด ให้สร้าง IFrame ฝังตรงๆ
  if (!player) {
    player = new YT.Player('player', {
      videoId: videoId,
      playerVars: {
        'autoplay': 1,
        'playsinline': 1,
        'rel': 0
      },
      events: {
        'onReady': (event) => {
          event.target.playVideo();
        }
      }
    });
  } else {
    // ถ้ามี Player แล้ว ให้เปลี่ยนเพลงทันที
    if (typeof player.loadVideoById === 'function') {
      player.loadVideoById(videoId);
    } else {
      // Fallback กรณี API ค้าง: โหลด IFrame ตรง
      container.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
  }

  // เลื่อนหน้าจอขึ้นไปดูวิดีโอด้านบน
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ระบบค้นหาเพลงผ่าน Netlify Function
async function searchSongs() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  const btn = document.getElementById('searchBtn');
  const resultsContainer = document.getElementById('resultsList');
  
  btn.disabled = true;
  btn.innerText = 'กำลังค้นหา...';
  resultsContainer.innerHTML = '<p style="color:#aaa; text-align:center;">กำลังค้นหาเพลง...</p>';

  try {
    const res = await fetch(`/.netlify/functions/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    resultsContainer.innerHTML = '';

    if (!data || data.length === 0) {
      resultsContainer.innerHTML = '<p style="color:#aaa; text-align:center;">ไม่พบเพลงที่ค้นหา</p>';
      return;
    }

    data.forEach(song => {
      const card = document.createElement('div');
      card.className = 'song-card';
      card.innerHTML = `
        <img src="${song.thumbnail}" alt="thumb">
        <div class="song-info">
          <div class="song-title">${song.title}</div>
          <div class="song-meta">${song.author} • ${song.duration}</div>
        </div>
      `;
      card.onclick = () => playSong(song.videoId);
      resultsContainer.appendChild(card);
    });
  } catch (err) {
    resultsContainer.innerHTML = `<p style="color:red; text-align:center;">เกิดข้อผิดพลาด: ${err.message}</p>`;
  } finally {
    btn.disabled = false;
    btn.innerText = 'ค้นหาเพลง';
  }
}

document.getElementById('searchBtn').addEventListener('click', searchSongs);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchSongs();
});
