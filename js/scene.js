//FPS on screen
(function(){var script=document.createElement('script');
  script.onload=function(){var stats=new Stats();
  document.body.appendChild(stats.dom);
  requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
  document.head.appendChild(script);})()


//setup the scene
var scene = new THREE.Scene();

//clock for movement and keyboard
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / innerHeight, 0.1, 1000 );
//scene.add( camera );

var renderer = new THREE.WebGLRenderer();
renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//broswer change in size

window.addEventListener ('resize', function()
{

  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize (width, height);
  camera.aspect = width/ height;                                
  camera.updateProjectionMatrix();
});



//Anagylph effect

/*var effect = new THREE.AnaglyphEffect (renderer);
effect.setSize (window.innerWidth, window.innerHeight);*/


//orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

//model loader
    var avatar;
    var loader = new THREE.ObjectLoader();

loader.load
      (
        'avatar.json',

        function (object)
      
      {
        avatar = object;
        avatar.scale.set (5,5,5);
        avatar.position.set (30,-5,0);                                      //I NEED TO MAKE THE AVATAR A USABLE MOVING OBJECT
        avatar.rotateY(0);                                                                               
        scene.add (object);
    
      } 


      );



//FOG
//scene.fog = new THREE.Fog (0xA0A0A0, 0.5, 0.0025);
//renderer.setClearColor (0xA0A0A0, 0);


//create material
//create shape
var geometry = new THREE.BoxGeometry(10,10,10);
var material = new THREE.MeshPhongMaterial ({color: 0x333333, wireframe:false, side: THREE.DoubleSide});
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0,0,0);
scene.add (cube);





//camera
       
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / innerHeight, 0.1, 1000 );
      camera.position.z = 50;
      camera.position.y = 20; 
      cube.add(camera);
      

       

////orbit controls
      controls = new THREE.OrbitControls(camera, renderer.domElement);

//skybox
    var geometry = new THREE.CubeGeometry (1900,1900,1900);
    var cubeMaterials = 
[
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load ("img/frontg.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load ("img/backg.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load ("img/upg.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load ("img/downg.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load ("img/rightg.png"), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial ({map: new THREE.TextureLoader().load ("img/leftg.png"), side: THREE.DoubleSide})
];

var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
var cube1 = new THREE.Mesh(geometry, cubeMaterial);
scene.add (cube1);




//lighting

    var ambientLight = new THREE.AmbientLight (0xFFFFFF, 0.1);
    scene.add (ambientLight);

//sphere lights
    var geometry = new THREE.SphereGeometry( 1, 8, 8 );
    var material = new THREE.MeshLambertMaterial( {color: 0xFF0040} );
    var sphere1 = new THREE.Mesh( geometry, material );
    scene.add( sphere1 );
    
    

    var geometry = new THREE.SphereGeometry(1, 8, 8 );
    var material = new THREE.MeshLambertMaterial( {color: 0x0040FF} );
    var sphere2 = new THREE.Mesh( geometry, material );
    scene.add( sphere2 );

    var geometry = new THREE.SphereGeometry( 1, 8, 8 );
    var material = new THREE.MeshLambertMaterial( {color: 0x00FF00} );
    var sphere3 = new THREE.Mesh( geometry, material );
    scene.add( sphere3 );

    var geometry = new THREE.SphereGeometry( 1, 8, 8 );
    var material = new THREE.MeshLambertMaterial( {color: 0xffaa00} );
    var sphere4 = new THREE.Mesh( geometry, material );
    scene.add( sphere4 );

//point light
    var light1 = new THREE.PointLight( 0xff0040, 6, 80 );

    				scene.add( light1 );

    var light2 = new THREE.PointLight( 0x0040ff, 6, 80 );

    				scene.add( light2 );

    var light3 = new THREE.PointLight( 0x00FF00, 6, 80 );

    				scene.add( light3 );


    var light4 = new THREE.PointLight( 0xffaa00, 6, 80 );

    				scene.add( light4 );




//OLD   movement for cube
  /*document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    var keyCode = event.keyCode;
          // up
          if (keyCode == 87) {
              cube.position.y += 5;
              // down
          } else if (keyCode == 83) {
              cube.position.y -= 5;
              // left
          } else if (keyCode == 65) {
              cube.position.x -= 5;
              // right

          } else if (keyCode == 68) {
              cube.position.x += 5;
              // space
            } else if (keyCode == 90) {
                cube.position.z += 5;
                // space
              } else if (keyCode == 88) {
                  cube.position.z += -5;
                  // space
          } else if (keyCode == 32) {
              cube.position.x = 0.0;
              cube.position.y = 0.0;
              cube.position.z = 0.0;
          }
};*/


  

//update method & game logic
var update = function()
{
        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.005;

    //lighting movement                                                             //I NEED TO BIND THE LIGHTS TO AVATAR
    var time = Date.now() * 0.0020;

        light1.position.x = Math.sin (time * 0.7) * 15;
        light1.position.y = Math.cos (time * 0.5) * 20;
        light1.position.z = Math.cos (time * 0.3) * 15;

        light2.position.x = Math.cos (time * 0.3) * 15;
        light2.position.y = Math.sin (time * 0.5) * 20;
        light2.position.z = Math.sin (time * 0.7) * 15;

        light3.position.x = Math.sin (time * 0.7) * 15;
        light3.position.y = Math.cos (time * 0.3) * 20;
        light3.position.z = Math.sin (time * 0.5) * 15;

        light4.position.x = Math.sin (time * 0.5) * 15;
        light4.position.y = Math.cos (time * 0.3) * 20;
        light4.position.z = Math.sin (time * 0.7) * 15;

        sphere1.position.x = Math.sin (time * 0.7) * 15;
        sphere1.position.y = Math.cos (time * 0.5) * 20;
        sphere1.position.z = Math.cos (time * 0.3) * 15;

        sphere2.position.x = Math.cos (time * 0.3) * 15;
        sphere2.position.y = Math.sin (time * 0.5) * 20;
        sphere2.position.z = Math.sin (time * 0.7) * 15;

        sphere3.position.x = Math.sin (time * 0.7) * 15;
        sphere3.position.y = Math.cos (time * 0.3) * 20;
        sphere3.position.z = Math.sin (time * 0.5) * 15;

        sphere4.position.x = Math.sin (time * 0.5) * 15;
        sphere4.position.y = Math.cos (time * 0.3) * 20;
        sphere4.position.z = Math.sin (time * 0.7) * 15;


//new movement code

  var delta = clock.getDelta(); // seconds.
  var moveDistance = 200 * delta; // 200 pixels per second
  var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
  
  

  // move forwards/backwards/left/right
  if ( keyboard.pressed("W") )
    avatar.translateZ( -moveDistance );
  if ( keyboard.pressed("S") )
    avatar.translateZ(  moveDistance );
  if ( keyboard.pressed("Q") )
    avatar.translateX( -moveDistance );
  if ( keyboard.pressed("E") )
    avatar.translateX(  moveDistance ); 

  // rotate left/right/up/down
  var rotation_matrix = new THREE.Matrix4().identity();
  if ( keyboard.pressed("A") )
    avatar.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
  if ( keyboard.pressed("D") )
    avatar.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
  if ( keyboard.pressed("R") )
    avatar.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
  if ( keyboard.pressed("F") )
    avatar.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
  
  if ( keyboard.pressed("Z") )
  {
    avatar.position.set(0,0,0);
    avatar.rotation.set(0,0,0);
  }
  

};

 
//draw scene
var render = function()
{
      renderer.render (scene, camera);
      //effect.render (scene, camera);
      
};
// run game loop (update, render, repeat)
var GameLoop = function()
{
       requestAnimationFrame (GameLoop);
       requestAnimationFrame(render);

 update();
 render();

};

GameLoop();
