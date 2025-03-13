let audioElements = document.querySelectorAll("audio");
let currentAudioIndex = 0;

function playSpeech() {
    audioElements[currentAudioIndex].play();
    toggleAnimation(); // Start animation when play button is clicked
}

function stopSpeech() {
    audioElements[currentAudioIndex].pause();
    audioElements[currentAudioIndex].currentTime = 0;
    toggleAnimation(); // Stop animation when stop button is clicked
}

function prevAudio() {
    stopSpeech();
    currentAudioIndex = 0; // Set to the index of the Kazakh audio
    playSpeech();
}

function nextAudio() {
    stopSpeech();
    currentAudioIndex = 1; // Set to the index of the Russian audio
    playSpeech();
}

audioElements.forEach(audio => {
    audio.addEventListener('ended', () => {
        nextAudio();
    });
});

window.addEventListener('beforeunload', () => {
    audioElements.forEach(audio => {
        audio.pause();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let model = document.querySelector("#model");

    if (!model) {
        console.error("Model element not found");
    }

    let playButton = document.querySelector(".buttons button:nth-child(1)");
    let stopButton = document.querySelector(".buttons button:nth-child(2)");
    let prevButton = document.querySelector(".buttons button:nth-child(4)");
    let nextButton = document.querySelector(".buttons button:nth-child(5)");

    if (playButton) {
        playButton.addEventListener('click', playSpeech);
    } else {
        console.error("Play button element not found");
    }

    if (stopButton) {
        stopButton.addEventListener('click', stopSpeech);
    } else {
        console.error("Stop button element not found");
    }

    if (prevButton) {
        prevButton.addEventListener('click', prevAudio);
    } else {
        console.error("Previous button element not found");
    }

    if (nextButton) {
        nextButton.addEventListener('click', nextAudio);
    } else {
        console.error("Next button element not found");
    }
});

function toggleAnimation() {
    let model = document.querySelector("#model");
    if (model) {
        if (model.hasAttribute("animation-mixer")) {
            model.removeAttribute("animation-mixer"); // Stop animation
        } else {
            model.setAttribute("animation-mixer", "clip: Mirzhakip.002Action; loop: repeat"); // Start animation
        }
    }
}

if (!AFRAME.components['animation-mixer']) {
    AFRAME.registerComponent('animation-mixer', {
        init: function () {
            this.el.addEventListener('model-loaded', () => {
                this.mixer = new THREE.AnimationMixer(this.el.getObject3D('mesh'));
                this.mixer.clipAction(this.el.getObject3D('mesh').animations[0]).play();
            });
        },
        tick: function (_time, deltaTime) {
            if (this.mixer) this.mixer.update(deltaTime / 1000);
        }
    });
}
