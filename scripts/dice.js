// script.js
let rotationX = 0;
let rotationY = 0;
let isRolling = false;
let targetX = 0;
let targetY = 0;
let lastFrameTime = 0;
const FPS = 120;
const frameInterval = 1000 / FPS;

const cube = document.querySelector('.cube');
const rollButton = document.querySelector('button');
const cheerAudio = document.getElementById('cheer');

function updateRotation() {
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

cheerAudio.addEventListener("play", function(){
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    (function frame() {
        confetti({
            particleCount: 55,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 55,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
    }());
});

cheerAudio.addEventListener("ended", function(){
    isRolling = false;
    rollButton.disabled = false;
});

function animate() {
    requestAnimationFrame(animate);

    if (isRolling) {
        const rotationSpeed = 0.1;
        rotationX += (targetX - rotationX) * rotationSpeed;
        rotationY += (targetY - rotationY) * rotationSpeed;

        updateRotation();

        if (Math.abs(rotationX - targetX) <= 0.1 && Math.abs(rotationY - targetY) <= 0.1) {
            rotationX = targetX;
            rotationY = targetY;
            updateRotation();
            cheerAudio.play();
            if (Math.abs(rotationX - targetX) <= 0.1 && Math.abs(rotationY - targetY) <= 0.1) {
                rotationX = targetX;
                rotationY = targetY;
                updateRotation();
                cheerAudio.play();
            }
        }
    }
}

function rollDice() {
    if (isRolling) return;

    isRolling = true;
    rollButton.disabled = true;

    let result = Math.floor(Math.random() * 6) + 1;

    switch (result) {
        case 1: targetX = 0; targetY = 0; break;
        case 2: targetX = 0; targetY = 90; break;
        case 3: targetX = -90; targetY = 0; break;
        case 4: targetX = 90; targetY = 0; break;
        case 5: targetX = 0; targetY = -90; break;
        case 6: targetX = 0; targetY = 180; break;
    }

    rotationX = Math.random() * 360 + 720;
    rotationY = Math.random() * 360 + 720;

    updateRotation();
}

requestAnimationFrame(animate);

document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('background-music');
    const bars = document.querySelectorAll('.synth-bar');
    let musicPlaying = false;

    document.body.addEventListener('click', function() {
        if (!musicPlaying) {
            audio.play();
            audio.volume = 0.4;
            musicPlaying = true;
            animateBars();
        }
    });

    function animateBars() {
        if (!musicPlaying) return;

        bars.forEach(bar => {
            const randomHeight = Math.random() * 20;
            bar.style.height = randomHeight + '%';
        });

        setTimeout(animateBars, 200);
    }
});