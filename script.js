function playSpeech() {
    let audio = document.getElementById("voice");
    audio.play();
}

function stopSpeech() {
    let audio = document.getElementById("voice");
    audio.pause();
    audio.currentTime = 0;
}

function toggleAnimation() {
    let model = document.querySelector("#model");

    if (model.hasAttribute("animation-mixer")) {
        model.removeAttribute("animation-mixer"); // Останавливаем анимацию
    } else {
        model.setAttribute("animation-mixer", "clip: Mirzhakip.002Action; loop: repeat"); // Запускаем анимацию
    }
}

