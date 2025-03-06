let audio = document.getElementById("voice");

function playSpeech () {
    audio.play();
}

function stopSpeech() {
    audio.pause();
    audio.currentTime = 0;
}

let model = document.querySelector("#model");

if (!model) {
    console.error("Model element not found");
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

if (model) {
    if (model.hasAttribute("animation-mixer")) {
        model.removeAttribute("animation-mixer"); // Stopping the animation
    } else {
        model.setAttribute("animation-mixer", "clip: Mirzhakip.002Action; loop: repeat"); // Start animation
    }
} else {
    console.error("Model element not found");
}

