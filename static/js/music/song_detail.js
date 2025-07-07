// document.addEventListener("DOMContentLoaded", function () {
//     const img = document.getElementById('cover-img');

//     // Только после загрузки изображения
//     img.addEventListener('load', function () {
//       const colorThief = new ColorThief();
//       const color = colorThief.getColor(img); // [r, g, b]
//       console.log(color)
//       // Применяем как фон с небольшим затемнением
//       const container = document.querySelector('.track-container');
//       container.style.background = `linear-gradient(rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.7), rgba(0, 0, 0, 0.9))`;
//     });
//   });


window.initSongBackground = function () {
    const img = document.getElementById('cover-img');

    // Только после загрузки изображения
    img.addEventListener('load', function () {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img); // [r, g, b]
      console.log(color)
      // Применяем как фон с небольшим затемнением
      const container = document.querySelector('.track-container');
      container.style.background = `linear-gradient(rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.7), rgba(0, 0, 0, 0.9))`;
    });
}

document.addEventListener('DOMContentLoaded', initSongBackground);