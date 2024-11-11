import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light for better shading
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(0, 5, 0);
scene.add(directionalLight);

// Create red cube
const redGeometry = new THREE.BoxGeometry(1, 1, 1);
const redMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const redCube = new THREE.Mesh(redGeometry, redMaterial);
redCube.position.set(-2, 0.5, 0);
scene.add(redCube);

// Create green cube
const greenGeometry = new THREE.BoxGeometry(1, 1, 1);
const greenMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const greenCube = new THREE.Mesh(greenGeometry, greenMaterial);
greenCube.position.set(0, 1.5, 0);
scene.add(greenCube);

// Create blue cube
const blueGeometry = new THREE.BoxGeometry(1, 1, 1);
const blueMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const blueCube = new THREE.Mesh(blueGeometry, blueMaterial);
blueCube.position.set(2, 0.5, 0);
scene.add(blueCube);

// Create white floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
floor.position.y = -0.5; // Position slightly below the cubes
scene.add(floor);

camera.position.set(0, 3, 7);
camera.lookAt(0, 0, 0);

let up = false;
let down = false;
let left = false;
let right = false;
let w = false;
let a = false;
let s = false;
let d = false;

document.onkeydown = function (e) {
    if (e.key === 'ArrowLeft') left = true;
    if (e.key === 'ArrowRight') right = true;
    if (e.key === 'ArrowUp') up = true;
    if (e.key === 'ArrowDown') down = true;
    if (e.key === 'w') w = true;
    if (e.key === 'a') a = true;
    if (e.key === 's') s = true;
    if (e.key === 'd') d = true;
}

document.onkeyup = function (e) {
    if (e.key === 'ArrowLeft') left = false;
    if (e.key === 'ArrowRight') right = false;
    if (e.key === 'ArrowUp') up = false;
    if (e.key === 'ArrowDown') down = false;
    if (e.key === 'w') w = false;
    if (e.key === 'a') a = false;
    if (e.key === 's') s = false;
    if (e.key === 'd') d = false;
}

document.addEventListener('mousemove', (e) => {
    const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    const mx = movementX * Math.PI / 180;
    const my = -movementY * Math.PI / 180;
    camera.rotateX(my);
    camera.rotateOnWorldAxis(new THREE.Vector3(0,1,0) ,-mx);
});

document.onclick = () => {
    document.body.requestPointerLock();
}

function animate() {
    const moveSpeed = 0.1;
    const rotationSpeed = 0.01;

    // Rotation (existing code)
    if (right) {
        camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -rotationSpeed);
    }
    if (left) {
        camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rotationSpeed);
    }
    if (up) {
        camera.rotateX(rotationSpeed);
    }
    if (down) {
        camera.rotateX(-rotationSpeed);
    }

    // Calculate movement based on the camera's current direction
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);

    if (w) {
        camera.translateZ(-moveSpeed);
    }
    if (s) {
        camera.translateZ(moveSpeed);
    }

    // Sideways movement based on camera's right direction
    const rightDir = new THREE.Vector3();
    rightDir.crossVectors(camera.up, forward).normalize();

    if (a) {
        camera.translateX(-moveSpeed);
    }
    if (d) {
        camera.translateX(moveSpeed); 
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();