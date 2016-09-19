/*global THREE, $, tilt*/

$(function(){
    var scene, camera, renderer, arrow
    
    var WIDTH  = $(window).width();
    var HEIGHT = $(window).height();
    
    function init() {
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 1000);
        camera.position.set(0, 30, 0);
        camera.lookAt(scene.position);
        
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor( 0x000000, 0 );
        renderer.setSize(WIDTH, HEIGHT);
        
        var dir = new THREE.Vector3( 1, 0, 0 );
        var origin = new THREE.Vector3( 0, 0, 0 );
        var length = 1;
        var hex = 0xffff00;
        arrow = THREE.ArrowHelper(dir, origin, length, hex);
        scene.add(arrow);
        
        renderer.domElement.className = 'foreground';
        
        document.body.appendChild(renderer.domElement);
    }
    
    function render() {
        requestAnimationFrame(render);
        
        camera.rotation.x = tilt.roll * Math.PI / 180 - Math.PI / 2;
       /* camera.rotation.y = -tilt.pitch * Math.PI / 180 + Math.PI / 3; */
        camera.rotation.z = tilt.yaw * Math.PI / 180; 
        
        
        
        renderer.render(scene, camera);
    }
    
    init();
    render();
});

//window.coordListener.getDirectionToGo();

