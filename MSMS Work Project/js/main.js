/*
TO DO:
- Scale down the distances for everything outer-belt? (If you're doing this it needs to be first priority)
- Make Mars and Mercury slightly larger?
- Add orbit lines
- Animate orbits along lines
- Brighten lights?
- Texture maps? (good luck buddy)
*/

var renderer;
var scene;
var camera;
var useTextures = true;

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
    render();
}

function sunlight( x, y, z, color, intensity ) {
    var light = new THREE.PointLight( color, intensity, 999999999999 );
    light.position.set( x, y, z );
    scene.add( light );
    var ambient = new THREE.AmbientLight( 0x101010 ); // soft white light
    scene.add( ambient );
}
//sun and planets
function sol() {
    var geometry = new THREE.SphereGeometry( 10.926, 32, 16 ); //scaled down by a decimal place from earth scaling
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/sun.jpg' ) : undefined);
    var material = new THREE.MeshBasicMaterial( { map: tex , color : 0xffff88 } );
    var sun = new THREE.Mesh( geometry, material );
    scene.add( sun );
}
function mercury() {
    var geometry = new THREE.SphereGeometry(0.38, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/mercury.jpg' ) : undefined);
    var material = new THREE.MeshLambertMaterial({ map : tex, color:0x999999});
    var merc = new THREE.Mesh(geometry, material);
    merc.translateX(18.8095); //taking into account the slightly changed size of the sun
    scene.add(merc);
}
function venus() {
    var geometry = new THREE.SphereGeometry(0.97, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/venus.jpg' ) : undefined);
    var material = new THREE.MeshLambertMaterial({map : tex , color:0xffba33});
    var ven = new THREE.Mesh (geometry, material);
    ven.translateX(29.5822); //all distances have 18.8095 (mercury distance from sun) added to them
    scene.add(ven);
}
function earth() {
    var geometry = new THREE.SphereGeometry(1, 32, 16); //everything is scaled to earth size
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/earth.png' ) : undefined);
    var material = new THREE.MeshLambertMaterial({map:tex, color:0x00b38e});
    var terra = new THREE.Mesh(geometry, material);
    terra.translateX(32.995);
    scene.add(terra);
}
function mars() {
    var geom = new THREE.SphereGeometry(0.53, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/mars.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial({mat:tex, color:0xb34700});
    var ares = new THREE.Mesh(geom, mat);
    ares.translateX(41.4575);
    scene.add(ares);
}
function jupiter() {
    var geom = new THREE.SphereGeometry(4.74, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/jupiter.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial({mat:tex, color:0xffcb80});
    var jove = new THREE.Mesh(geom, mat);
    jove.translateX(81.3895); //however, since we removed the asteroid belt after mars, we are now adding 3.9095 (width of asteroid belt (1 AU) subtracted from mercury's distance to the sun)
    scene.add(jove);
}
function saturn() {
    var geom = new THREE.SphereGeometry(5.595, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/saturn.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial({color:0xffffb3});
    var sat = new THREE.Mesh(geom, mat);
    sat.translateX(146.6515);
    scene.add(sat);
}
function uranus() {
    var geom = new THREE.SphereGeometry(3.69, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/uranus.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial({mat:tex, color:0x1f7a7a});
    var badJoke = new THREE.Mesh(geom, mat);
    badJoke.translateX(218.3205); //distance between saturn and uranus halved
    scene.add(badJoke);
}
function neptune() {
    var geom = new THREE.SphereGeometry(3.5, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/neptune.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial({mat:tex, color:0x0086b3});
    var nept = new THREE.Mesh(geom, mat);
    nept.translateX(379.9855); //everything else scales accordingly by subtracting 71.669
    scene.add(nept);
}
function pluto() {
    var geom = new THREE.SphereGeometry(0.95, 32, 16); //scaled up by a half because i couldnt see it
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/pluto.png' ) : undefined);
    var mat = new THREE.MeshLambertMaterial({mat:tex, color:0xffccb3});
    var plu = new THREE.Mesh(geom, mat);
    plu.translateX(520.4925);
    scene.add(plu);
}

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
