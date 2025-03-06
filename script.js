let audio = document.getElementById("voice");

function playSpeech() {
    audio.play();
}

function stopSpeech() {
    audio.pause();
    audio.currentTime = 0;
}

document.addEventListener('DOMContentLoaded', () => {
    let model = document.querySelector("#model");

    if (!model) {
        console.error("Model element not found");
    }

    let playButton = document.getElementById("playButton");
    let stopButton = document.getElementById("stopButton");

    if (playButton) {
        playButton.addEventListener('click', toggleAnimation);
    } else {
        console.error("Play button element not found");
    }

    if (stopButton) {
        stopButton.addEventListener('click', toggleAnimation);
    } else {
        console.error("Stop button element not found");
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
