document.addEventListener('click', function (e) {
    if (e.target.classList.contains('play-btn')) {
        e.preventDefault();
        const coverImg = document.getElementById('now-playing-cover');
        const audio = document.getElementById('player');
        const src = e.target.dataset.src;
        audio.src = src;
        audio.play();
        console.log(e.target.dataset.artist)

        ctrlIcon.innerHTML = '<path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z">'
        ctrlIcon.classList.remove('play');
        ctrlIcon.classList.add('pause');
        // обращаюсь к html 
        document.getElementById('now-playing').textContent = e.target.dataset.title;
        document.getElementById('now-playing-artist').textContent = e.target.dataset.artist;
        coverImg.src = e.target.dataset.cover;
        if (e.target.dataset.cover) {
            coverImg.src = e.target.dataset.cover;
        } else {
            coverImg.src = '/static/images/placeholder.png';
        }
    }
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
            window.history.pushState({}, '', url);
        });
}

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
}

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.remove('pause');
    ctrlIcon.classList.add('play');
}