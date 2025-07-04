// const btnCloseModal = document.getElementById('close-modal-button');
// const modal = document.getElementById('upload-modal');


// btnCloseModal.addEventListener("click", function () {
//     modal.classList.remove('hidden');
// })

// document.addEventListener('DOMContentLoaded', function () {
//     const fileInput = document.getElementById('id_audio_file');
//     const modal = document.getElementById('upload-modal');
//     const closeBtn = document.getElementById('close-modal-button');
//     const fileNameDisplay = document.getElementById("file-name-display");

//     fileInput.addEventListener('change', function () {
//         if (fileInput.files.length > 0) {
//             modal.classList.add('show');     
//             modal.classList.remove('hidden');
//             const file = fileInput.files[0];
//             const name = file.name;
//             fileNameDisplay.textContent = name;
//             console.log(name)
//         }
//     });

//     closeBtn.addEventListener('click', function () {
//         modal.classList.remove('show');     
//         modal.classList.add('hidden');
//     });

//     modal.addEventListener('click', function (event) {
//         const content = modal.querySelector('.modal-content');
//         if (!content.contains(event.target)) {
//             modal.classList.remove('show');
//             modal.classList.add('hidden');
//         }
//     });
// });


window.initUploadModal = function () {
    const fileInput = document.getElementById('id_audio_file');
    const modal = document.getElementById('upload-modal');
    const closeBtn = document.getElementById('close-modal-button');
    const fileNameDisplay = document.getElementById("file-name-display");

    if (!fileInput || !modal || !closeBtn || !fileNameDisplay) return;

    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            modal.classList.add('show');     
            modal.classList.remove('hidden');
            const file = fileInput.files[0];
            const name = file.name;
            fileNameDisplay.textContent = name;
        }
    });

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');     
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', function (event) {
        const content = modal.querySelector('.modal-content');
        if (!content.contains(event.target)) {
            modal.classList.remove('show');
            modal.classList.add('hidden');
        }
    });
}

document.addEventListener('DOMContentLoaded', initUploadModal);
window.initUpload = initUploadModal;