import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(12, 2, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 'white', wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight('white');
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight('white');
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 'white' });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(1000).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('https://i.ibb.co/K5X0HP6/space.jpg');
scene.background = spaceTexture;

const filcoLogo = new THREE.TextureLoader().load('https://i.ibb.co/WgvjJg4/logo.png');

const logo = new THREE.Mesh(
    new THREE.BoxGeometry(7, 7, 7),
    new THREE.MeshBasicMaterial({ map: filcoLogo })
);

scene.add(logo);

const loader = new THREE.FontLoader();
loader.load('helvetiker_bold.typeface.json', function (font) {
    const colour = 'white';
    const textGeometryOne = new THREE.TextGeometry("Blockchain", { font: font, size: 8, height: 2, material: 0, bevelThickness: 1, extrudeMaterial: 1 });
    const textOne = new THREE.Mesh(textGeometryOne, new THREE.MeshBasicMaterial({ color: colour }));
    textOne.position.x = 60;
    textOne.position.y = 20;
    textOne.position.z = 100;
    scene.add(textOne);

    const textGeometryTwo = new THREE.TextGeometry("Film", { font: font, size: 8, height: 2, material: 0, bevelThickness: 1, extrudeMaterial: 1 });
    const textTwo = new THREE.Mesh(textGeometryTwo, new THREE.MeshBasicMaterial({ color: colour }));
    textTwo.position.x = 60;
    textTwo.position.y = 10;
    textTwo.position.z = 100;
    scene.add(textTwo);

    const textGeometryThree = new THREE.TextGeometry("Finance", { font: font, size: 8, height: 2, material: 0, bevelThickness: 1, extrudeMaterial: 1 });
    const textThree = new THREE.Mesh(textGeometryThree, new THREE.MeshBasicMaterial({ color: colour }));
    textThree.position.x = 60;
    textThree.position.y = 0;
    textThree.position.z = 100;
    scene.add(textThree);

    const textGeometryFour = new THREE.TextGeometry("Coming Soon!", { font: font, size: 4, height: 1, material: 0, bevelThickness: 1, extrudeMaterial: 1 });
    const textFour = new THREE.Mesh(textGeometryFour, new THREE.MeshBasicMaterial({ color: colour }));
    textFour.position.x = 60;
    textFour.position.y = -15;
    textFour.position.z = 100;
    scene.add(textFour);
});

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.x = t * -0.1;
    camera.position.y = t * -0.01;
    camera.position.z = (t * -0.2) + 30;
}

document.body.onscroll = moveCamera;

var angleTwo = 0;

function animate() {
    requestAnimationFrame(animate);
    //torus.rotation.x += 0.01;
    torus.rotation.y -= 0.01;
    torus.rotation.z -= 0.01;
    logo.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), angleTwo);
    angleTwo += 0.02;
    //controls.update();
    renderer.render(scene, camera);
}

animate();