import * as THREE from 'three';
import STLLoader from "./STLLoader";
import OrbitControls from "./OrbitControls";
import CuteOcto from "../models/CuteOcto.stl";
import registerDropHandler from "./drop";

// Prepare loaders and controls
STLLoader(THREE);
OrbitControls(THREE);

//
// Scene
//
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xc2d8f9 );

//
// Camera
//
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

//
// Renderer
//
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//
// Lights
//
const bright = new THREE.DirectionalLight( 0xffffff );
bright.position.set( 1, 1, 1 );
scene.add( bright );
const secondary = new THREE.DirectionalLight( 0xaaaaaa );
secondary.position.set( -1, -1, -1 );
scene.add( secondary );
const ambient = new THREE.AmbientLight( 0x666666 );
scene.add( ambient );

//
// Controls
//
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;

//
// STL render and loader
//
const renderStl = ( geometry ) => {
  const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 50 } );
  const mesh = new THREE.Mesh( geometry, material );
  mesh.name = "model";
  mesh.rotation.set( - Math.PI / 2, 0, - Math.PI );
  mesh.position.set( 0, - 0.5, 0 );
  mesh.scale.set( 0.02, 0.02, 0.02 );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add( mesh );
}

const loader = new THREE.STLLoader();
const loadModel = ( path ) => {
  loader.load( path, renderStl );
}

loadModel(CuteOcto);

const reloadModel = ( file ) => {
  let model = scene.getObjectByName( "model" );
  let reader = new FileReader();
  reader.onload = () => {
    renderStl( loader.parse( reader.result ) );
  };
  reader.readAsArrayBuffer( file );
  scene.remove( model );
}

//
// Attach drop handling
//
registerDropHandler( renderer.domElement, reloadModel );

//
// Animation loop
//
const animate = function () {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
};

animate();