/*
TO DO:
- Make orbits elliptical
*/

//global planet variables
var merc;
var ven;
var terra;
var ares;
var jove;
var sat;
var badJoke;
var nept;
var plu;

//global variables
var renderer;
var scene;
var camera;
var useTextures = true;
var lineMat = new THREE.LineBasicMaterial({color:0xffffff});

//numbers
var AU = 32.995;  //multiply sma by AU and get correct radius from the sun
var DEG = Math.PI/180;
var N = 360; //points on orbit line
//eccentricity values for each planet respectively
var ecc = [0.205627, 0.006793, 0.016726, 0.093368, 0.048435, 0.055682, 0.047209, 0.008575, 0.250236];
//semi-major axis values for each planet respectively
var sma = [0.38709893, 0.72333199, 1.0000001, 1.52366231, 5.20336301, 9.53707032, 19.19126393, 30.06896348, 39.48168677];

//equations
function semiMinorAxis (a, e) {
    return a*Math.sqrt(1-e*e);
}
function ellipseRadius(a, e, f) {
    return a*(1-e*e)/(1+e*Math.cos(f));
}

//initiate scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.x = 9.820;
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
    var geometry = new THREE.SphereGeometry( 5.483, 32, 16 ); //scaled down by a decimal place from earth scaling
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/sun.jpg' ) : undefined);
    var material = new THREE.MeshBasicMaterial( useTextures ? { map: tex } : { color : 0xffff88 } );
    var sun = new THREE.Mesh( geometry, material );
    scene.add( sun );
}
function mercury() {
    var group = new THREE.Group();
    //line
    var line = new THREE.EllipseCurve(0, 0, sma[0]*AU, semiMinorAxis(sma[0]*AU, ecc[0]), 0, 2*Math.PI, false, 0);
    var tmp = [];
    for (var i=0; i<=N; ++i) {
        var f = Math.PI*2*i/N;
        var r = ellipseRadius(sma[0]*AU, ecc[0], f);
        var x = r*Math.cos(f);
        var y = r*Math.sin(f);
        tmp.push(new THREE.Vector2(x, y));
    }
    var path = new THREE.Path( tmp );
    var geometry = path.createPointsGeometry( 360 );
    var orbit = new THREE.Line(geometry, lineMat);
    orbit.rotation.x = Math.PI/2;
    group.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(0.38, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/mercury.jpg' ) : undefined);
    var material = new THREE.MeshLambertMaterial( useTextures? { map : tex } : {color:0x999999});
    merc = new THREE.Mesh(geom, material);
    //merc.translateX(18.8095); //taking into account the slightly changed size of the sun
    group.add(merc);
    group.rotation.z = 7.00399*DEG;
    scene.add(group);
}
function venus() {
    var group = new THREE.Group();
    //line
    var line = new THREE.EllipseCurve(0, 0, sma[1]*AU, semiMinorAxis(sma[1]*AU, ecc[1]), 0, 2*Math.PI, false, 0);
    var tmp = [];
    for (var i=0; i<=N; ++i) {
        var f = Math.PI*2*i/N;
        var r = ellipseRadius(sma[1]*AU, ecc[1], f);
        var x = r*Math.cos(f);
        var y = r*Math.sin(f);
        tmp.push(new THREE.Vector2(x, y));
    }
    var path = new THREE.Path( tmp );
    var geometry = path.createPointsGeometry( 360 );
    var orbit = new THREE.Line(geometry, lineMat);
    orbit.rotation.x = Math.PI/2;
    group.add(orbit);
    //planet
    var geometry = new THREE.SphereGeometry(0.97, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/venus.jpg' ) : undefined);
    var material = new THREE.MeshLambertMaterial(useTextures ? {map : tex} : {color:0xffba33});
    ven = new THREE.Mesh (geometry, material);
    //ven.translateX(29.5822); //all distances have 18.8095 (mercury distance from sun) added to them
    group.add(ven);
    group.rotation.z = 3.39423*DEG;
    scene.add(group);
}
function earth() {
    var group = new THREE.Group();
    //line
    var line = new THREE.EllipseCurve(0, 0, sma[2]*AU, semiMinorAxis(sma[2]*AU, ecc[2]), 0, 2*Math.PI, false, 0);
    var tmp = [];
    for (var i=0; i<=N; ++i) {
        var f = Math.PI*2*i/N;
        var r = ellipseRadius(sma[2]*AU, ecc[2], f);
        var x = r*Math.cos(f);
        var y = r*Math.sin(f);
        tmp.push(new THREE.Vector2(x, y));
    }
    var path = new THREE.Path( tmp );
    var geometry = path.createPointsGeometry( 360 );
    var orbit = new THREE.Line(geometry, lineMat);
    orbit.rotation.x = Math.PI/2;
    group.add(orbit);
    //planet
    var geometry = new THREE.SphereGeometry(1, 32, 16); //everything is scaled to earth size
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/earth.png' ) : undefined);
    var material = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0x00b38e});
    terra = new THREE.Mesh(geometry, material);
    //terra.translateX(32.995);
    group.add(terra);
    scene.add(group);
}
function mars() {
    var group = new THREE.Group();
    //line
    var line = new THREE.EllipseCurve(0, 0, sma[3]*AU, semiMinorAxis(sma[3]*AU, ecc[3]), 0, 2*Math.PI, false, 0);
    var tmp = [];
    for (var i=0; i<=N; ++i) {
        var f = Math.PI*2*i/N;
        var r = ellipseRadius(sma[3]*AU, ecc[3], f);
        var x = r*Math.cos(f);
        var y = r*Math.sin(f);
        tmp.push(new THREE.Vector2(x, y));
    }
    var path = new THREE.Path( tmp );
    var geometry = path.createPointsGeometry( 360 );
    var orbit = new THREE.Line(geometry, lineMat);
    orbit.rotation.x = Math.PI/2;
    group.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(0.53, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/mars.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0xb34700});
    ares = new THREE.Mesh(geom, mat);
    //ares.translateX(41.4575);
    group.add(ares);
    group.rotation.z = 1.84991*DEG;
    scene.add(group);
}
function jupiter() {
    var group = new THREE.Group();
    //line
    var line = new THREE.EllipseCurve(0, 0, sma[4]*AU, semiMinorAxis(sma[4]*AU, ecc[4]), 0, 2*Math.PI, false, 0);
    var tmp = [];
    for (var i=0; i<=N; ++i) {
        var f = Math.PI*2*i/N;
        var r = ellipseRadius(sma[4]*AU, ecc[4], f);
        var x = r*Math.cos(f);
        var y = r*Math.sin(f);
        tmp.push(new THREE.Vector2(x, y));
    }
    var path = new THREE.Path( tmp );
    var geometry = path.createPointsGeometry( 360 );
    var orbit = new THREE.Line(geometry, lineMat);
    orbit.rotation.x = Math.PI/2;
    group.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(4.74, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/jupiter.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0xffcb80});
    jove = new THREE.Mesh(geom, mat);
    //jove.translateX(81.3895); //however, since we removed the asteroid belt after mars, we are now adding 3.9095 (width of asteroid belt (1 AU) subtracted from mercury's distance to the sun)
    group.add(jove);
    group.rotation.z = 1.30536*DEG;
    scene.add(group);
}
function saturn() {
    var group = new THREE.Group();
    //line
    var line = new THREE.EllipseCurve(0, 0, sma[5]*AU, semiMinorAxis(sma[5]*AU, ecc[5]), 0, 2*Math.PI, false, 0);
    var tmp = [];
    for (var i=0; i<=N; ++i) {
        var f = Math.PI*2*i/N;
        var r = ellipseRadius(sma[5]*AU, ecc[5], f);
        var x = r*Math.cos(f);
        var y = r*Math.sin(f);
        tmp.push(new THREE.Vector2(x, y));
    }
    var path = new THREE.Path( tmp );
    var geometry = path.createPointsGeometry( 360 );
    var orbit = new THREE.Line(geometry, lineMat);
    orbit.rotation.x = Math.PI/2;
    group.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(5.595, 32, 16);
    var rings = new THREE.RingGeometry(8, 15.768, 32, 1);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/saturn.jpg' ) : undefined);
    var ringMat = new THREE.MeshLambertMaterial({color:0xffffff, side:THREE.DoubleSide});
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0xffffb3});
    var ringMesh = new THREE.Mesh(rings, ringMat);
    sat = new THREE.Mesh(geom, mat);
    //sat.translateX(146.6515);
    ringMesh.rotation.x = (Math.PI/2-0.01);
    sat.add(ringMesh);
    group.add(sat);
    group.rotation.z = 2.48991*DEG;
    scene.add(group);
}
function uranus() {
    var group = new THREE.Group();
    //line
    var line = new THREE.EllipseCurve(0, 0, sma[6]*AU, semiMinorAxis(sma[6]*AU, ecc[6]), 0, 2*Math.PI, false, 0);
    var tmp = [];
    for (var i=0; i<=N; ++i) {
        var f = Math.PI*2*i/N;
        var r = ellipseRadius(sma[6]*AU, ecc[6], f);
        var x = r*Math.cos(f);
        var y = r*Math.sin(f);
        tmp.push(new THREE.Vector2(x, y));
    }
    var path = new THREE.Path( tmp );
    var geometry = path.createPointsGeometry( 360 );
    var orbit = new THREE.Line(geometry, lineMat);
    orbit.rotation.x = Math.PI/2;
    group.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(3.69, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/uranus.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0x1f7a7a});
    badJoke = new THREE.Mesh(geom, mat);
    //badJoke.translateX(218.3205); //distance between saturn and uranus halved
    group.add(badJoke);
    group.rotation.z = 0.77306*DEG;
    scene.add(group);
}
function neptune() {
    var group = new THREE.Group();
    //line
    var line = new THREE.EllipseCurve(0, 0, sma[7]*AU, semiMinorAxis(sma[7]*AU, ecc[7]), 0, 2*Math.PI, false, 0);
    var tmp = [];
    for (var i=0; i<=N; ++i) {
        var f = Math.PI*2*i/N;
        var r = ellipseRadius(sma[7]*AU, ecc[7], f);
        var x = r*Math.cos(f);
        var y = r*Math.sin(f);
        tmp.push(new THREE.Vector2(x, y));
    }
    var path = new THREE.Path( tmp );
    var geometry = path.createPointsGeometry( 360 );
    var orbit = new THREE.Line(geometry, lineMat);
    orbit.rotation.x = Math.PI/2;
    group.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(3.5, 32, 16);
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/neptune.jpg' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0x0086b3});
    nept = new THREE.Mesh(geom, mat);
    //nept.translateX(379.9855); //everything else scales accordingly by subtracting 71.669
    group.add(nept);
    group.rotation.z = 1.77375*DEG;
    scene.add(group);
}
function pluto() {
    var group = new THREE.Group();
    //line
    var line = new THREE.EllipseCurve(0, 0, sma[8]*AU, semiMinorAxis(sma[8]*AU, ecc[8]), 0, 2*Math.PI, false, 0);
    var tmp = [];
    for (var i=0; i<=N; ++i) {
        var f = Math.PI*2*i/N;
        var r = ellipseRadius(sma[8]*AU, ecc[8], f);
        var x = r*Math.cos(f);
        var y = r*Math.sin(f);
        tmp.push(new THREE.Vector2(x, y));
    }
    var path = new THREE.Path( tmp );
    var geometry = path.createPointsGeometry( 360 );
    var orbit = new THREE.Line(geometry, lineMat);
    orbit.rotation.x = Math.PI/2;
    group.add(orbit);
    //planet
    var geom = new THREE.SphereGeometry(0.95, 32, 16); //scaled up by a half because i couldnt see it
    var tex = (useTextures ? THREE.ImageUtils.loadTexture( 'images/pluto.png' ) : undefined);
    var mat = new THREE.MeshLambertMaterial(useTextures ? {map:tex} : {color:0xffccb3});
    plu = new THREE.Mesh(geom, mat);
    //plu.translateX(520.4925);
    group.add(plu);
    group.rotation.z = 17.1699*DEG;
    scene.add(group);
}

//animation
var clock = new THREE.Clock();
var theta = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//position updater

function updateMercPos(dt) {
    //var r = sma[0]*32.995;
    theta[0] -= dt*(2*Math.PI/7.23);
    var r = ellipseRadius(sma[0]*AU, ecc[0], theta[0]);
    merc.position.x = r*Math.cos(theta[0]);
    merc.position.z = r*Math.sin(theta[0]);
}
function updateVenPos(dt) {
    //var r = sma[1]*32.995;
    var r = ellipseRadius(sma[1]*AU, ecc[1], theta[1]);
    theta[1] -= dt*(2*Math.PI/18.47);
    ven.position.x = r*Math.cos(theta[1]);
    ven.position.z = r*Math.sin(theta[1]);
}
function updateEarthPos(dt) {
    //var r = sma[2]*32.995;
    var r = ellipseRadius(sma[2]*AU, ecc[2], theta[2]);
    theta[2] -= dt*(2*Math.PI/30);
    terra.position.x = r*Math.cos(theta[2]);
    terra.position.z = r*Math.sin(theta[2]);
}
function updateMarsPos(dt) {
    //var r = sma[3]*32.995;
    var r = ellipseRadius(sma[3]*AU, ecc[3], theta[3]);
    theta[3] -= dt*(2*Math.PI/54.986);
    ares.position.x = r*Math.cos(theta[3]);
    ares.position.z = r*Math.sin(theta[3]);
}
function updateJovePos(dt) {
    //var r = sma[3]*32.995;
    var r = ellipseRadius(sma[4]*AU, ecc[4], theta[4]);
    theta[4] -= dt*(2*Math.PI/81.3895);
    jove.position.x = r*Math.cos(theta[4]);
    jove.position.z = r*Math.sin(theta[4]);
}
function updateSatPos(dt) {
    //var r = sma[3]*32.995;
    var r = ellipseRadius(sma[5]*AU, ecc[5], theta[5]);
    theta[5] -= dt*(2*Math.PI/146.6515);
    sat.position.x = r*Math.cos(theta[5]);
    sat.position.z = r*Math.sin(theta[5]);
}
function updateUrPos(dt) {
    //var r = sma[3]*32.995;
    var r = ellipseRadius(sma[6]*AU, ecc[6], theta[6]);
    theta[6] -= dt*(2*Math.PI/218.3205);
    badJoke.position.x = r*Math.cos(theta[6]);
    badJoke.position.z = r*Math.sin(theta[6]);
}
function updateNeptPos(dt) {
    //var r = sma[3]*32.995;
    var r = ellipseRadius(sma[7]*AU, ecc[7], theta[7]);
    theta[7] -= dt*(2*Math.PI/379.9855);
    nept.position.x = r*Math.cos(theta[7]);
    nept.position.z = r*Math.sin(theta[7]);
}
function updatePluPos(dt) {
    //var r = sma[3]*32.995;
    var r = ellipseRadius(sma[8]*AU, ecc[8], theta[8]);
    theta[8] -= dt*(2*Math.PI/520.4925);
    plu.position.x = r*Math.cos(theta[8]);
    plu.position.z = r*Math.sin(theta[8]);
}

//actual frame drawer
function animate() {
    requestAnimationFrame(animate);
    var dt = clock.getDelta();
    updateMercPos(dt);
    updateVenPos(dt);
    updateEarthPos(dt);
    updateMarsPos(dt);
    updateJovePos(dt);
    updateSatPos(dt);
    updateUrPos(dt);
    updateNeptPos(dt);
    updatePluPos(dt);
    render();
}

//renderer
function render() {
	renderer.render( scene, camera );
}
