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
    let mixer = model.components["animation-mixer"];
    
    if (mixer) {
        let action = mixer.mixer.clipAction('Mirzhakip.002Action');
        if (action) {
            if (action.paused) {
                action.play();
            } else {
                action.stop();
            }
        }
    }
}
