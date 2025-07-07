const audioForWavefrom = document.getElementById('player');
window.currentWs = null;
function initWaveForm() {
  const waveformElements = document.querySelectorAll('.waveform');

  if (waveformElements.length === 0) return;

  const audio = document.getElementById('player');

  waveformElements.forEach((el) => {
    const src = el.dataset.src;

    const ws = WaveSurfer.create({
      container: el,
      backend: 'MediaElement',
      media: audio,
      waveColor: '#ccc',
      progressColor: '#ff5500',
      height: 60,
      responsive: true,
      barWidth: 2,
    });
    ws.load(src);
    window.wavesurfers = window.wavesurfers || {};
    window.wavesurfers[src] = ws;
  });
}

document.addEventListener('DOMContentLoaded', initWaveForm)

  function initMusic() {
    const audio       = document.getElementById('player');
    const ctrlIcon    = document.getElementById('ctrlIcon');
    const coverImg    = document.getElementById('now-playing-cover');
    const titleEl     = document.getElementById('now-playing');
    const artistEl    = document.getElementById('now-playing-artist');
    const queueListEl = document.querySelector('.queue-list');
    const playButtons = Array.from(document.querySelectorAll('.play-btn'));


    if (!audio || playButtons.length === 0) return;

    // собираем плейлист
    const playlist = playButtons.map(btn => ({
      url:    btn.dataset.src,
      title:  btn.dataset.title,
      artist: btn.dataset.artist,
      cover:  btn.dataset.cover || '/static/images/placeholder.png'
    }));
    let currentIndex = 0;

    function updateUI(track) {
      titleEl.textContent    = track.title;
      artistEl.textContent   = track.artist;
      coverImg.src           = track.cover;
      // ставим иконку паузы
      ctrlIcon.innerHTML     = '<path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z">';
      ctrlIcon.classList.remove('play');
      ctrlIcon.classList.add('pause');
    }

    function updateQueueUI(pl, idx) {
      queueListEl.innerHTML = '';
      pl.slice(idx + 1).forEach((track, i) => {
        const el = document.createElement('div');
        el.className = 'queue-track';
        el.innerHTML = `
          <img src="${track.cover}" class="queue-cover" />
          <div class="queue-info">
            <p class="queue-artist">${track.artist}</p>
            <p class="queue-title">${track.title}</p>
          </div>`;
        el.addEventListener('click', () => playTrack(idx + 1 + i));
        queueListEl.appendChild(el);
      });
    }

    function playTrack(i) {
      currentIndex = i;
      const track = playlist[i];
      audio.src    = track.url;

      updateUI(track);
      updateQueueUI(playlist, i);
      audio.play()
    }

    // навешиваем кнопки
    playButtons.forEach((btn, i) =>
      btn.addEventListener('click', () => playTrack(i))
    );

    // автопереход
    audio.addEventListener('ended', () => {
      if (currentIndex < playlist.length - 1) {
        playTrack(currentIndex + 1);
      } else {
        // плейлист кончился — иконка «play»
        ctrlIcon.classList.remove('pause');
        ctrlIcon.classList.add('play');
        ctrlIcon.innerHTML = `<path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"/>`;
      }
    });

    // prev / next — опционально, если у вас есть такие кнопки
    document.getElementById('prev-track')?.addEventListener('click', () => {
      if (currentIndex === 0 || audio.currentTime > 5) {
        playTrack(currentIndex);
      } else {
        playTrack(currentIndex - 1);
      }
    });
    document.getElementById('next-track')?.addEventListener('click', () => {
      if (currentIndex < playlist.length - 1) {
        playTrack(currentIndex + 1);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initMusic);

  document.addEventListener("DOMContentLoaded", () => {
  const lyricsBtn = document.getElementById("lyrics-btn");
  const lyricsModal = document.getElementById("lyrics-modal");
  const closeLyricsBtn = document.getElementById("close-lyrics-btn");
  const lyricsContainer = document.getElementById("lyrics-content");
  const lrcText = `[00:03.00] Fuck, going on  
  [00:06.00] City lights and business nights  
  [00:08.00] Expensive pain everyday  
  [00:09.00] Summer 2024, Los Angeles  
  
  [00:10.00] Стою у бара, эта ho моя пара (H-h-hey s-s-s—)  
  [00:13.00] Мы с мужчинами в Prada  
  [00:15.00] Damn, you so fine, madam  
  [00:16.00] Damn, you so fine, madam  
  [00:18.00] Damn, you so fine, madam  
  [00:19.00] Ты в порядке, ты мама  
  [00:20.00] От рассвета до заката, от заката до талого  
  
  [00:24.00] Эти типы ебланы, они дети в карманах  
  [00:26.00] Трусы Dolce и Gabbana, они не ебут за Лану  
  [00:29.00] Кожей наполнена ванна, ты из Мишлен ресторана  
  [00:32.00] Взрослая Ханна Монтана, да, это то, что мне надо  
  
  [00:35.00] Okay, beauty queen from movie scene  
  [00:38.00] Yeah, she was more like Billie E, not Billie Jean  
  [00:42.00] You got seats in my head, and they VIP  
  [00:45.00] Apply pressure, cause damage, like you an enemy  

  [00:48.00] Есть деньги на hotel, но мы едем в motel, е  
  [00:51.00] Она раздевается — well, well, well  
  [00:53.00] Из окна машины она выбросила Рики  
  [00:56.00] Сделай погромче, из колонок Weeknd, е  
  [01:00.00] Она сумасшедшая, хочет die young (Ха)  
  [01:03.00] Зачем ты это говоришь? Мы становимся higher  
  [01:05.00] Таким, как ты, сукам не ставится цена, я  
  [01:08.00] Таким, как ты, сукам не ставится цена, но  

  [01:11.00] I ain't got no type (Oh, I ain't got no type)  
  [01:14.00] But you, bitch, is the only thing that I like, yeah  
  [01:17.00] Я просто живу life, быть рядом с тобой — это hype (Hype)  
  [01:20.00] Ща тишина будто drive, сука, делай меня alive  
  [01:23.00] Like, oh-oh  

  [01:34.00] Стою у бара, эта ho моя пара  
  [01:36.00] Мы с мужчинами в Prada  
  [01:38.00] Damn, you so fine, madam  
  [01:39.00] Damn, you so fine, madam  
  [01:40.00] Damn, you so fine, madam  
  [01:42.00] Ты в порядке, ты мама  
  [01:44.00] От рассвета до заката, от заката до талого  

  [01:47.00] Эта ho моя пара  
  [01:48.00] Мы с мужчинами в Prada  
  [01:50.00] Damn, you so fine, madam  
  [01:51.00] Damn, you so fine, madam  
  [01:52.00] Damn, you so fine, madam  
  [01:55.00] Damn, you so fine, madam  
  [01:57.00] Damn, you so fine, madam  
  [01:58.00] Ты в порядке, ты мама  
  `;

  const parsedLyrics = lrcText.trim().split("\n").map(line => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (!match) return null;
    const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
    return { time, text: match[3].trim() };
  }).filter(Boolean);

  parsedLyrics.forEach(({ text }) => {
    const p = document.createElement("p");
    p.className = "line";
    p.setAttribute("data-text", text);
    p.textContent = text;
    lyricsContainer.appendChild(p);
  });

  const lines = [...document.querySelectorAll('.lyrics-content .line')];

  const audio = document.getElementById("player");
  audio.addEventListener("timeupdate", () => {
    const current = audio.currentTime;
    let activeIndex = parsedLyrics.findIndex((line, i) =>
      current >= line.time && (i === parsedLyrics.length - 1 || current < parsedLyrics[i + 1].time)
    );
    lines.forEach((el, i) => {
      const isActive = i === activeIndex;
      el.classList.toggle("active", isActive);
      if (isActive) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  lyricsBtn.addEventListener("click", () => {
    lyricsModal.classList.toggle("is-hidden");
  });

  closeLyricsBtn.addEventListener("click", () => {
    lyricsModal.classList.add("is-hidden");
  });

  lyricsModal.addEventListener("click", (e) => {
    if (!e.target.closest(".lyrics-modal-content")) {
      lyricsModal.classList.add("is-hidden");
    }
  });
});


  function loadPage(event, url) {
    event?.preventDefault();
    fetch(url)
      .then(res => res.text())
      .then(html => {
        const doc     = new DOMParser().parseFromString(html, 'text/html');
        const content = doc.getElementById('main-content');

        document.getElementById('main-content').innerHTML = content.innerHTML;
        document.body.className                          = doc.body.className;
        document.querySelector('.parent').className      = doc.querySelector('.parent').className;
        window.history.pushState({}, '', url);

        initMusic();  
        initUploadModal();
        initWaveForm();
        initSongBackground();
      });
  }

  window.addEventListener('popstate', () =>
    loadPage(null, location.pathname)
  );

document.addEventListener('click', function (e) {
    const btn = e.target.closest('.like-btn');
    if (!btn) return;

    const songId = btn.dataset.id;
    fetch('/music/like/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: `song_id=${encodeURIComponent(songId)}`
    })
    .then(res => res.json())
    .then(data => {
      // обновляем SVG, не затирая структуру
      const path = btn.querySelector('path');
      if (path) {
        path.setAttribute('fill', data.liked ? 'currentColor' : '#000');
      }
      if (!data.liked) {
        const wrapper = btn.closest('.song-wrapper');
        if (wrapper) wrapper.remove();
      }
      console.log(data.liked)
    })
    .catch(console.error);
});

// функция получения CSRF токена
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            if (cookie.trim().startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.trim().substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


let progress = document.getElementById('progress');
let ctrlIcon = document.getElementById('ctrlIcon');
let song = document.getElementById('player');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');


song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause () {
    const ws = window.currentWs; 

    if(ctrlIcon.classList.contains('play')) {
        song.play()
        ctrlIcon.classList.remove('play');
        ctrlIcon.classList.add('pause');
        ctrlIcon.innerHTML = '<path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z">'
    } else {
        song.pause();
        ctrlIcon.classList.remove('pause');
        ctrlIcon.classList.add('play');
        ctrlIcon.innerHTML = `<path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"/>`;
    }
};

if (ctrlIcon.classList.contains('play')) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
};

progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.remove('pause');
    ctrlIcon.classList.add('play');
};

song.addEventListener('loadedmetadata', () => {
  duration.textContent = formatTime(song.duration);
});

song.addEventListener('timeupdate', () => {
  currentTime.textContent = formatTime(song.currentTime);
});


function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}


let volumeSlider = document.querySelector('.volume-slider');
let volumeIcon = document.querySelector('.volume');


function setVolume(){
    song.volume = volumeSlider.value / 100;
}

volumeSlider.addEventListener('input', function () {
    const value = parseInt(this.value); // 0–100
    song.volume = value / 100; 

    this.style.background = `linear-gradient(to right, #ffffff ${value}%, #2e2c2c ${value}%)`;

    if (value > 50) {
        volumeIcon.innerHTML = `<path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z">`
    } 
    if (value < 50) {
        volumeIcon.innerHTML = `<path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55ZM208,128a39.93,39.93,0,0,1-10,26.46,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,1,1,12-10.58A40,40,0,0,1,208,128Z">`
    } 
    if (value == 0) {
        volumeIcon.innerHTML = `<path d="M163.51,24.81a8,8,0,0,0-8.42.88L85.25,80H40A16,16,0,0,0,24,96v64a16,16,0,0,0,16,16H85.25l69.84,54.31A8,8,0,0,0,168,224V32A8,8,0,0,0,163.51,24.81ZM152,207.64,92.91,161.69A7.94,7.94,0,0,0,88,160H40V96H88a7.94,7.94,0,0,0,4.91-1.69L152,48.36Zm101.66-61.3a8,8,0,0,1-11.32,11.32L224,139.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L212.69,128l-18.35-18.34a8,8,0,0,1,11.32-11.32L224,116.69l18.34-18.35a8,8,0,0,1,11.32,11.32L235.31,128Z">`
    }
})

let lastVolume = 0;
let isMuted = false;

volumeIcon.addEventListener('click' , function () {
    if (!isMuted) {
        lastVolume = song.volume;
        song.volume = 0
        volumeSlider.value = 0;
        volumeIcon.innerHTML = `<path d="M163.51,24.81a8,8,0,0,0-8.42.88L85.25,80H40A16,16,0,0,0,24,96v64a16,16,0,0,0,16,16H85.25l69.84,54.31A8,8,0,0,0,168,224V32A8,8,0,0,0,163.51,24.81ZM152,207.64,92.91,161.69A7.94,7.94,0,0,0,88,160H40V96H88a7.94,7.94,0,0,0,4.91-1.69L152,48.36Zm101.66-61.3a8,8,0,0,1-11.32,11.32L224,139.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L212.69,128l-18.35-18.34a8,8,0,0,1,11.32-11.32L224,116.69l18.34-18.35a8,8,0,0,1,11.32,11.32L235.31,128Z">`
        volumeSlider.style.background = `linear-gradient(to right, #ffffff 0%, #2e2c2c 0%)`;
        isMuted = true;
    } else {
        song.volume = lastVolume;
        const value = lastVolume * 100;
        volumeSlider.value = value;
        volumeSlider.style.background = `linear-gradient(to right, #ffffff ${value}%, #2e2c2c ${value}%)`;

        if (value > 50) {
            volumeIcon.innerHTML = `<path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z">`
        } 
        if (value < 50) {
            volumeIcon.innerHTML = `<path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55ZM208,128a39.93,39.93,0,0,1-10,26.46,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,1,1,12-10.58A40,40,0,0,1,208,128Z">`
        } 
        if (value == 0) {
            volumeIcon.innerHTML = `<path d="M163.51,24.81a8,8,0,0,0-8.42.88L85.25,80H40A16,16,0,0,0,24,96v64a16,16,0,0,0,16,16H85.25l69.84,54.31A8,8,0,0,0,168,224V32A8,8,0,0,0,163.51,24.81ZM152,207.64,92.91,161.69A7.94,7.94,0,0,0,88,160H40V96H88a7.94,7.94,0,0,0,4.91-1.69L152,48.36Zm101.66-61.3a8,8,0,0,1-11.32,11.32L224,139.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L212.69,128l-18.35-18.34a8,8,0,0,1,11.32-11.32L224,116.69l18.34-18.35a8,8,0,0,1,11.32,11.32L235.31,128Z">`
        }

        isMuted = false;
    }

})

const musicSlider = document.querySelector('.music-slider');

song.addEventListener('timeupdate', function () {
    const raw = (song.currentTime / song.duration) * 100;
    const value = Math.floor(raw);
    const pos = `${value}%`;
    musicSlider.style.setProperty('--pos', pos);
})


const nextUpButtonClose = document.querySelector('.close-button');
const nextUpModal = document.querySelector('.nextup-modal');
const nextModalContent = document.querySelector('.nextup-modal-content');
const nextIcon = document.querySelector('.next-container');

nextUpButtonClose.addEventListener("click", function () {
    nextUpModal.classList.remove('show')
});

nextIcon.addEventListener("click", function () {
    nextUpModal.classList.toggle('show')
});

nextUpModal.addEventListener("click", function (event) {
  if (!nextModalContent.contains(event.target)) {
    this.classList.remove('show');
  }
});
