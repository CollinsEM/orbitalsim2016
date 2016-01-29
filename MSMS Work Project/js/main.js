/*
TO DO:
- Animate orbits along lines
*/

//global planet variables
var merc;
var ven;
var terra;
var ares;
//global variables
var renderer;
var scene;
var camera;
var useTextures = true;
var lineMat = new THREE.MeshBasicMaterial({color:0xffffff});
//eccentricity values for each planet respectively
var ecc = [0.205627, 0.006793, 0.016726, 0.093368, 0.048435, 0.055682, 0.047209, 0.008575, 0.250236];
//semi-major axis values for each planet respectively
var sma = [0.38709893, 0.72333199, 1.00000011, 1.52366231, 5.20336301, 9.53707032, 19.19126393, 30.06896348, 39.48168677];
function orbitSpeed (a, e) {
    
}

//initiate scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.x = 98.20;
    camera.position.z = 1;
    camera.position.y = 49.1;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.damping = 0.2;
    controls.maxPolarAngle = 0.49*Math.PI;
    
    //solar system
    sol();
    mercury();
    venus();
    earth();
    mars();
    jupiter();
    saturn();
    uranus();
    neptune();
    pluto();
    
    sunlight(0, 0, 0, 0xfff5e5, 1); //get light yellow hex
    animate();
}

function sunlight( x, y, z, color, intensity ) {
    var light = new THREE.PointLight( color, intensity, 999999999999 );
    light.position.set( x, y, z );
    scene.add( light );
    var ambient = new THREE.AmbientLight( 0x101010 ); // soft white light
    scene.add( ambient );
}
//sun and planets geometry
function sol() {
    var geometry = new THREE.SphereGeometry( 10.926, 32, 16 ); //scaled down by a decimal place from earth scaling
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/sun.jpg' ) : undefined);
    var material = new THREE.MeshBasicMaterial( useTextures ? { map: tex } : { color : 0xffff88 } );
    var sun = new THREE.Mesh( geometry, material );
    scene.add( sun );
}
function mercury() {
    //line
    var line = new THREE.TorusGeometry(18.8095, 0.038, 6, 32);
    var orbit = new THREE.Mesh(line, lineMat);
    orbit.rotation.x = Math.PI/2;
    scene.add(orbit);
    //planet
    var geometry = new THREE.SphereGeometry(0.38, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/mercury.jpg' ) : undefined);
    var material = new THREE.MeshLambertMaterial( useTextures? { map : tex } : {color:0x999999});
    merc = new THREE.Mesh(geometry, material);
    merc.translateX(18.8095); //taking into account the slightly changed size of the sun
    scene.add(merc);
}
function venus() {
    //line
    var line = new THREE.TorusGeometry(29.5822, 0.097, 6, 32);
    var orbit = new THREE.Mesh(line, lineMat);
    orbit.rotation.x = Math.PI/2;
    scene.add(orbit);
    //planet
    var geometry = new THREE.SphereGeometry(0.97, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/venus.jpg' ) : undefined);
    var material = new THREE.MeshLambertMaterial(useTextures ? {map : tex} : {color:0xffba33});
    ven = new THREE.Mesh (geometry, material);
    ven.translateX(29.5822); //all distances have 18.8095 (mercury distance from sun) added to them
    scene.add(ven);
}
function earth() {
   //line
    var line = new THREE.TorusGeometry(32.995, 0.1, 6, 32);
    var orbit = new THREE.Mesh(line, lineMat);
    orbit.rotation.x = Math.PI/2;
    scene.add(orbit);
    //planet
    var geometry = new THREE.SphereGeometry(1, 32, 16); //everything is scaled to earth size
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/earth.png' ) : undefined);
    var material = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0x00b38e});
    terra = new THREE.Mesh(geometry, material);
    terra.translateX(32.995);
    scene.add(terra);
}
function mars() {
    //line
    var line = new THREE.TorusGeometry(41.4575, 0.053, 6, 32);
    var orbit = new THREE.Mesh(line, lineMat);
    orbit.rotation.x = Math.PI/2;
    scene.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(0.53, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/mars.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0xb34700});
    ares = new THREE.Mesh(geom, mat);
    ares.translateX(41.4575);
    scene.add(ares);
}
function jupiter() {
    //line
    var line = new THREE.TorusGeometry(81.3895, 0.474, 6, 64);
    var orbit = new THREE.Mesh(line, lineMat);
    orbit.rotation.x = Math.PI/2;
    scene.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(4.74, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/jupiter.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0xffcb80});
    var jove = new THREE.Mesh(geom, mat);
    jove.translateX(81.3895); //however, since we removed the asteroid belt after mars, we are now adding 3.9095 (width of asteroid belt (1 AU) subtracted from mercury's distance to the sun)
    scene.add(jove);
}
function saturn() {
    //line
    var line = new THREE.TorusGeometry(146.6515, 0.5595, 6, 64);
    var orbit = new THREE.Mesh(line, lineMat);
    orbit.rotation.x = Math.PI/2;
    scene.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(5.595, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/saturn.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0xffffb3});
    var sat = new THREE.Mesh(geom, mat);
    sat.translateX(146.6515);
    scene.add(sat);
}
function uranus() {
    //line
    var line = new THREE.TorusGeometry(218.3205, 0.369, 6, 64);
    var orbit = new THREE.Mesh(line, lineMat);
    orbit.rotation.x = Math.PI/2;
    scene.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(3.69, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/uranus.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0x1f7a7a});
    var badJoke = new THREE.Mesh(geom, mat);
    badJoke.translateX(218.3205); //distance between saturn and uranus halved
    scene.add(badJoke);
}
function neptune() {
    //line
    var line = new THREE.TorusGeometry(379.9855, 0.35, 6, 64);
    var orbit = new THREE.Mesh(line, lineMat);
    orbit.rotation.x = Math.PI/2;
    scene.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(3.5, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/neptune.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0x0086b3});
    var nept = new THREE.Mesh(geom, mat);
    nept.translateX(379.9855); //everything else scales accordingly by subtracting 71.669
    scene.add(nept);
}
function pluto() {
    //line
    var line = new THREE.TorusGeometry(520.4925, 0.095, 6, 64);
    var orbit = new THREE.Mesh(line, lineMat);
    orbit.rotation.x = Math.PI/2;
    scene.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(0.95, 32, 16); //scaled up by a half because i couldnt see it
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/pluto.png' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0xffccb3});
    var plu = new THREE.Mesh(geom, mat);
    plu.translateX(520.4925);
    scene.add(plu);
}

//animation
var clock = new THREE.Clock();
var r = sma[2]*32.995;
var theta = 0;

function updatePositions(dt) {
    theta -= dt*(2*Math.PI/30);
    terra.position.x = r*Math.cos(theta);
    terra.position.z = r*Math.sin(theta);
}

function animate() {
    requestAnimationFrame(animate);
    var dt = clock.getDelta();
    updatePositions(dt);
    render();
}

//renderer
function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
