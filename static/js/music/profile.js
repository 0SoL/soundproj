function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
  

const openBtn = document.getElementById('openSpotlightModal');
const closeBtn = document.getElementById('closeSpotlightModal');
const modal = document.getElementById('spotlightModal');
const form = document.getElementById('spotlightForm');

openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

form.addEventListener('submit', function (e) {
e.preventDefault();
const checked = form.querySelectorAll('input[name="song_ids"]:checked');
if (checked.length > 4) {
    alert('Выбери не более 4 треков');
    return;
}

const data = new FormData();
checked.forEach(input => data.append('song_ids[]', input.value));

fetch("/user/update-spotlight/", {
    method: 'POST',
    headers: {
    'X-CSRFToken': getCookie('csrftoken'),
    },
    body: data,
})
.then(res => res.json())
.then(data => {
    console.log(data)
    if (data.error) {
    alert(data.error);
    } else {
    alert('Spotlight обновлён!');
    location.reload(); 
    }
});
});