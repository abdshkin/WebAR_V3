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

    playButton.addEventListener('click', () => {
        if (model && !model.hasAttribute("animation-mixer")) {
            model.setAttribute("animation-mixer", "clip: Mirzhakip.002Action; loop: repeat"); // Start animation
        }
    });

    stopButton.addEventListener('click', () => {
        if (model && model.hasAttribute("animation-mixer")) {
            model.removeAttribute("animation-mixer"); // Stop animation
        }
    });
});

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
