const container = document.getElementById('loading-screen');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.OBJLoader();
loader.loadMTLLoader = function (url) {
    return new THREE.MTLLoader().setPath(url.substring(0, url.lastIndexOf("/") + 1)).load(url);
};

loader.load('src/1.obj', 'src/1.mtl', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material.side = THREE.DoubleSide; // Display both sides of the model
        }
    });
    scene.add(object);

    // Remove loading screen after model loads
    container.style.display = 'none';

    animate();
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    // Rotate the model (optional)
    object.rotation.y += 0.01;

    renderer.render(scene, camera);
}