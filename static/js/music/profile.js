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
  

const followBtn = document.getElementById('follow-button');
console.log(followBtn)
followBtn.addEventListener('click', function () {
  const followBtn = document.getElementById('follow-button');
  const username = followBtn.dataset.username;
  const btnText = document.querySelector('.button-text')
  const followersCount = document.querySelector('.followers-count')
  console.log(followersCount.textContent)
  fetch('/user/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: new URLSearchParams({
      username: username
    })
  })
  .then(res => res.json())
  .then(data => {
    if(data.following) {
      followBtn.classList.add('followed-button')
      btnText.textContent = 'Following'
      followersCount.textContent = parseInt(followersCount.textContent) + 1
    }
    else {
      followBtn.classList.remove('followed-button')
      followBtn.classList.add('follow-button')
      btnText.textContent = 'Follow'
      followersCount.textContent = parseInt(followersCount.textContent) - 1
  }  
  })
  .catch(console.error);
});