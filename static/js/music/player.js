document.addEventListener('click', function (e) {
    if (e.target.classList.contains('play-btn')) {
        e.preventDefault();
        const audio = document.getElementById('player');
        const src = e.target.dataset.src;
        audio.src = src;
        audio.play();

        document.getElementById('now-playing').textContent = e.target.dataset.title;
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