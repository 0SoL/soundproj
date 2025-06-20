// document.addEventListener('click', function (e) {
//     if (e.target.classList.contains('play-btn')) {
//         e.preventDefault();
//         // const coverImg = document.getElementById('now-playing-cover');
//         // const audio = document.getElementById('player');
//         // const tracks = document.querySelector('play-btn');
        
//         // // creating a playlist


//         // const src = e.target.dataset.src;
//         // audio.src = src;
        
//         // audio.play();
//         // console.log(e.target.dataset.artist)

//         // ctrlIcon.innerHTML = '<path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z">'
//         // ctrlIcon.classList.remove('play');
//         // ctrlIcon.classList.add('pause');
//         // // обращаюсь к html 
//         // document.getElementById('now-playing').textContent = e.target.dataset.title;
//         // document.getElementById('now-playing-artist').textContent = e.target.dataset.artist;
//         // coverImg.src = e.target.dataset.cover;
//         // if (e.target.dataset.cover) {
//         //     coverImg.src = e.target.dataset.cover;
//         // } else {
//         //     coverImg.src = '/static/images/placeholder.png';
//         // }
//         const audio = document.getElementById('player');
//         const playButtons = document.querySelectorAll(".play-btn");
//         const coverImg = document.getElementById('now-playing-cover');

//         const playlist = Array.from(playButtons).map(btn => ({
//             url: btn.dataset.src,
//             title: btn.dataset.title,
//             artist: btn.dataset.artist,
//             cover: btn.dataset.cover
//         }));

//         let currentIndex = 0;

//         function playTrack(index) {
//             currentIndex = index;
//             const track = playlist[index];
//             audio.src = track.url;
//             audio.play()

//             ctrlIcon.innerHTML = '<path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z">'
//             ctrlIcon.classList.remove('play');
//             ctrlIcon.classList.add('pause');

//             // обращаюсь к html 
//             document.getElementById('now-playing').textContent = e.target.dataset.title;
//             document.getElementById('now-playing-artist').textContent = e.target.dataset.artist;
//             coverImg.src = e.target.dataset.cover;
//             if (e.target.dataset.cover) {
//                 coverImg.src = e.target.dataset.cover;
//             } else {
//                 coverImg.src = '/static/images/placeholder.png';
//             }
//         }

//         playButtons.forEach((btn, index) => {
//         btn.addEventListener("click", () => {
//             playTrack(index);
//         });
//         });

//         audio.addEventListener("ended", () => {
//         if (currentIndex < playlist.length - 1) {
//             playTrack(currentIndex + 1);

//             ctrlIcon.innerHTML = '<path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z">'
//             ctrlIcon.classList.remove('play');
//             ctrlIcon.classList.add('pause');

//             // обращаюсь к html 
//             document.getElementById('now-playing').textContent = e.target.dataset.title;
//             document.getElementById('now-playing-artist').textContent = e.target.dataset.artist;
//             coverImg.src = e.target.dataset.cover;
//             if (e.target.dataset.cover) {
//                 coverImg.src = e.target.dataset.cover;
//             } else {
//                 coverImg.src = '/static/images/placeholder.png';
//             }
//         } else {
//             console.log("Конец плейлиста");
//         }
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('player');
  const ctrlIcon = document.getElementById('ctrlIcon');      
  const coverImg = document.getElementById('now-playing-cover');
  const titleEl  = document.getElementById('now-playing');
  const artistEl = document.getElementById('now-playing-artist');

  // Собираем плейлист один раз
  const playButtons = Array.from(document.querySelectorAll('.play-btn'));
  console.log(playButtons)
  const playlist = playButtons.map(btn => ({
    url:    btn.dataset.src,
    title:  btn.dataset.title,
    artist: btn.dataset.artist,
    cover:  btn.dataset.cover || '/static/images/placeholder.png'
  }));
  console.log(playlist)

  let currentIndex = 0;

  // Обновляем UI в одном месте
  function updateUI(track) {
    titleEl.textContent  = track.title;
    artistEl.textContent = track.artist;
    coverImg.src         = track.cover;
    ctrlIcon.innerHTML   = '<path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z">';
    ctrlIcon.classList.remove('play');
    ctrlIcon.classList.add('pause');
  }

  // Функция воспроизведения трека по индексу
  function playTrack(index) {
    currentIndex = index;
    const track = playlist[index];
    audio.src = track.url;
    updateUI(track);
    audio.play();
  }

  // Навешиваем клики на все кнопки один раз
  playButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => playTrack(index));
  });

  // Автопереход к следующему треку
  audio.addEventListener('ended', () => {
    if (currentIndex < playlist.length - 1) {
      playTrack(currentIndex + 1);
    } else {
      console.log('Плейлист завершён');
      // при желании можно вернуть иконку в "play"
      ctrlIcon.classList.remove('pause');
      ctrlIcon.classList.add('play');
      ctrlIcon.innerHTML = `<path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"/>`;
    }
  });

  // функция для пред. трека
  const btnPrevTrack = document.getElementById("prev-track");
  btnPrevTrack.addEventListener("click", function () {
    if (currentIndex === 0) {
        playTrack(currentIndex)
    } else if (audio.currentTime > 5) {
        playTrack(currentIndex);
    } else {
        playTrack(currentIndex - 1);
    }
  });

  const btnNextTrack = document.getElementById("next-track");
  btnNextTrack.addEventListener("click", function () {
    if (currentIndex+1 >= playlist.length) {
        console.log("Дальше нет треков")
        console.log(currentIndex)
        console.log(playlist.length)
    } else {
        playTrack(currentIndex + 1);
    }
  })
});


function loadPage(event, url) {
    console.log("loadPage triggered:", url);
    event.preventDefault();
    fetch(url)
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const content = doc.getElementById('main-content');
            document.getElementById('main-content').innerHTML = content.innerHTML;

            document.body.className = doc.body.className;
            const newParentClasses = doc.querySelector('.parent').className;
            document.querySelector('.parent').className = newParentClasses;

            window.history.pushState({}, '', url);
        });
}

window.addEventListener('popstate', () => loadPage(null, location.pathname));

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('like-btn')) {
        const songId = e.target.dataset.id;

        fetch('/music/like/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: `song_id=${songId}`
        })
        .then(res => res.json())
        .then(data => {
            e.target.textContent = data.liked ? '❤️' : '🤍';
        });
    }
});

// Функция получения CSRF токена
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

