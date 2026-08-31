let player;
let isPlayerReady = false;

// โหลด YouTube IFrame Player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: '', // ว่างไว้ตอนเริ่ม
    playerVars: {
      'autoplay': 1,
      'controls': 1
    },
    events: {
      'onReady': () => { isPlayerReady = true; }
    }
  });
}

function playSong(videoId) {
  if (isPlayerReady && player.loadVideoById) {
    player.loadVideoById(videoId);
  }
}

// ระบบค้นหาเพลงผ่าน Netlify Function
async function searchSongs() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  const btn = document.getElementById('searchBtn');
  const resultsContainer = document.getElementById('resultsList');
  
  btn.disabled = true;
  btn.innerText = 'กำลังค้นหา...';
  resultsContainer.innerHTML = '<p style="color:#aaa;">กำลังโหลดข้อมูล...</p>';

  try {
    const res = await fetch(`/.netlify/functions/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    resultsContainer.innerHTML = '';

    if (!data || data.length === 0) {
      resultsContainer.innerHTML = '<p style="color:#aaa;">ไม่พบเพลงที่ค้นหา</p>';
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
    resultsContainer.innerHTML = `<p style="color:red;">เกิดข้อผิดพลาด: ${err.message}</p>`;
  } finally {
    btn.disabled = false;
    btn.innerText = 'ค้นหาเพลง';
  }
}

document.getElementById('searchBtn').addEventListener('click', searchSongs);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchSongs();
});
