import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

let scene;
let camera;
let renderer;
let cotoFnF;
let model_container = document.querySelector('.webgl');
const canvasSize = document.querySelector('.canvas-element');

const init = () => {
    // scene setup
    scene = new THREE.Scene();

    //camera setup
    const fov = 40;
    const aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 1);
    camera.lookAt(scene.position);
    scene.add(camera);

    //renderer setup
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: model_container
    });
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);

    // orbitcontrol setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    // ambient light setup
    const amibientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(amibientLight);

    // direction lights setup
    const spotLight1 = new THREE.SpotLight(0x1d27f0, 5);
    spotLight1.position.set(6, 11, 6);
    spotLight1.castShadow = true;
    scene.add(spotLight1);

    // orenge light setup
    const spotLight2 = new THREE.SpotLight(0xf57d22, 2);
    spotLight2.position.set(-10, 0, 12);
    spotLight2.castShadow = true;
    scene.add(spotLight2);

    // back light setup
    const spotLight3 = new THREE.SpotLight(0x1d27f0, 2);
    spotLight3.position.set(-10, 18, -17);
    spotLight3.castShadow = true;
    scene.add(spotLight3);

    // loding gltf 3d model
    const loader = new GLTFLoader();
    loader.load('/assets/CotoFnF.glb', (gltf) => {
        cotoFnF = gltf.scene;
        cotoFnF.scale.set(1.8, 1.8, 1.8)
        cotoFnF.position.set(0, 0, 0)
        scene.add(gltf.scene);
    });

    animate();
}

// redering scene and camera
const render = () => {
    renderer.render(scene, camera);
}

// animation recursive function
let step = 0
const animate = () => {
    requestAnimationFrame(animate);
    step += 0.01;
    cotoFnF.position.y =  0.01*Math.abs(Math.sin(step));
    cotoFnF.rotation.y = Math.sin(step)*(Math.abs(Math.cos(step / 3) / 4));

    render();
}

// making responsive
const windowResize = () => {
    camera.aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    render();
}

window.addEventListener('resize', windowResize, false);
window.onload = init;