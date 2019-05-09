//______________________TIMER___________________________________
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

//________________________FPS on screen__________________________________
(function(){var script=document.createElement('script');
  script.onload=function(){var stats=new Stats();
  document.body.appendChild(stats.dom);
  requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
  document.head.appendChild(script);})() 


//__________________________Setup the scene_______________________________
var scene = new THREE.Scene();

//______________________Clock/keyboard for movement_______________________
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

var renderer = new THREE.WebGLRenderer();
renderer.setSize (window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//___________________Browser change in size_______________________________

window.addEventListener ('resize', function()
{

  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize (width, height);
  camera.aspect = width/ height;
  camera.updateProjectionMatrix();
});

var objects=[];


//_________________________Game Flow State________________________________

GameFlowState = {

    UNKNOWN : 0,
    INITIALISE : 1,
    GAMESTART: 2,
    GAMEPLAY : 3,
    TALLY: 4
  };

//_____________________________Game Flow__________________________________
class GameFlow {
    constructor() {
      this.currentState = GameFlowState.INITIALISE;
    }

    Update() {
        //console.log(this.currentState)
      switch ( this.currentState ) {

        case GameFlowState.INITIALISE:
        document.getElementById("intro_ok_button").onclick = function () {
          document.getElementById("intro_ui").style.display = 'none';
            gameFlow.currentState = GameFlowState.GAMESTART;
        }
        document.getElementById("intro_ui").style.display = 'block';
        gameFlow.currentState = GameFlowState.UNKNOWN;
        break;

        case GameFlowState.GAMESTART:
          cube.shields = 1;
          gameFlow.currentState = GameFlowState.GAMEPLAY;
        break;

        case GameFlowState.GAMEPLAY:
        if ( cube.shields <= 50 ) {
          gameFlow.currentState = GameFlowState.TALLY;
        }
        break;

        
     }
    }
  }
  var gameFlow = new GameFlow();

//_________________________Entity Class____________________________________
class Entity {
    	constructor() {
    	}

    	Update() {
    	}

    	Reset() {
    	}
    }

//___________________________Cube in Avatar___________________________________
class Avatar extends Entity {
     constructor(newMesh) {
       super();

               this.size = 5;
               this.geometry = new THREE.BoxGeometry(2,2,2,);
               this.material = new THREE.MeshPhongMaterial( {color: 0xFF1493} );
               this.mesh = new THREE.Mesh( this.geometry, this.material );           
               this.mesh.position.set = (0, 0, 0);                            
               this.collidable = true;
               this.shields = 1;            
               scene.add( this.mesh );       
               
               }
            
       Reset() {
           super.Reset();
       }

       Update() {
           super.Update();

                document.getElementById('hud_distance').innerHTML = (this.mesh.position.z/1000).toFixed(2) + " km";
                document.getElementById('hud_shields').innerHTML = (this.shields).toFixed(2) + " Points"; 

 //____________________________________COLLISION CODE________________________________           

              if ( this.CollidedWithObstacle() && this.shields > 0) {
               this.shields++;
               console.log(" POINT ");
                                               
      }                       
      }
            DistanceTo(x, z) {
        // (xA-xB)²+(yA-yB)²+(zA-zB)² < (rA+rB)²
                   let dist = Math.abs ( Math.sqrt (
                        ( ( this.mesh.position.x - x ) * ( this.mesh.position.x - x ) ) +
                        ( ( this.mesh.position.z - z ) * ( this.mesh.position.z - z ) ) 
                         
                    ) );
            // /console.log("DistanceTo() = " + dist);
        return dist;
                             }

                 IsCollidedWith(that) {
                      // size + size > distance
                          let collidedWith = (this.size + that.size) > this.DistanceTo(that.mesh.position.x,  that.mesh.position.z);
                         // console.log("IsCollidedWith() " + collidedWith + " " + (this.size + that.size));
                          return collidedWith;
                                      }

                  CollidedWithObstacle() {

                      for(var n=0; n<objects.length; n++) {
                   // if ( objects[n].collidable == true ) {
                      if ( this.IsCollidedWith(objects[n]) == true ) {
                      return true;
                    }
                //}
           }
            return false;              
        }   
          
   }
                 
   var cube = new Avatar();
   

//_______________________________HOOP (Obstacle) CLASS______________________________

class Obstacle extends Entity {
          constructor() {
                //  console.log("Obstacle() constructor");
                super();
                this.size = 8;

                
                this.geometry = new THREE.RingGeometry( 1, 5, 32 )
                this.material = new THREE.MeshBasicMaterial( { color: 0xFFD700, side: THREE.DoubleSide} );
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.mesh.position.x = (Math.random() - 0.8) * 7000;
                this.mesh.position.y = (Math.random() - 0.8) * 7000;
                this.mesh.position.z = (Math.random() - 0.8) * 5000;
                this.mesh.rotation.x = Math.random();
                this.mesh.rotation.y = Math.random();
                this.mesh.rotation.z = Math.random();
                this.mesh.scale.set(4,4,4);               
                this.mesh.collidable = true;               

                scene.add (this.mesh);


                      }

                      Reset() {
                            super.Reset();
                            //for ( var i = 0; i<30; i++){
                            
                      }

                      Update() {
                            super.Update();
                            this.mesh.position.z += 0.015;
                            this.mesh.position.y += 0.015;
                            this.mesh.position.x += 0.015;
                              
                          }
                    }

//________________________Obstacle Array_______________________________

        for(var i = 0; i <30; i++){
          var obstacle = new Obstacle();
          objects.push(new Obstacle());
        }


//______________________Platform Class_____________________________________
    class Platform extends Entity {
          constructor() {
                //  console.log("Obstacle() constructor");
                super();

                      
                //create shape
                      this.geometry = new THREE.BoxGeometry(50,3,50);
                      this.material = new THREE.MeshPhongMaterial ({color: 0x333333, wireframe:false, side: THREE.DoubleSide});
                      this.mesh = new THREE.Mesh(this.geometry, this.material);
                      this.mesh.receiveShadow = true;
                      this.mesh.position.x = 0;
                      this.mesh.position.y = -6.5;
                      this.mesh.position.z = 0;
                      scene.add (this.mesh);


          }

          Reset() {
                super.Reset();
          }

          Update() {
                super.Update();
                //cube.rotation.x += 0.01;
                //this.mesh.rotation.y += 0.005;                                      

          }
        }

        var platform = new Platform();



//____________________Lathe Class_______________________________________

class Lathe extends Entity {
          constructor() {
                
                super();

                var points = [];


                for ( var i = 0; i < 10; i ++ ) {
                points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
                }

                //create shape
                      this.geometry = new THREE.LatheGeometry( points);
                      this.material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
                      this.mesh = new THREE.Mesh(this.geometry, this.material);
                      this.mesh.position.x = (Math.random() - 0.8) * 8000;
                      this.mesh.position.y = (Math.random() - 0.8) * 8000;
                      this.mesh.position.z = (Math.random() - 0.8) * 8000;
                      this.mesh.rotation.x = Math.random();
                      this.mesh.rotation.x = Math.random();
                      this.mesh.rotation.x = Math.random();
                      this.mesh.scale.set(5,5,5);
                      scene.add (this.mesh);


          }

          Reset() {
                super.Reset();
          }

          Update() {
                super.Update();

                this.mesh.position.z += 0.5;
                this.mesh.position.y += 0.5;
                this.mesh.position.x += 0.5;

          }
        }
        for ( var i = 0; i<15; i++)     
          {
          var lathe = new Lathe();
          objects.push(new Lathe());
        }

//_____________________________Anagylph effect_________________

//var effect = new THREE.AnaglyphEffect (renderer);
//effect.setSize (window.innerWidth, window.innerHeight);

//____________________________Sphere lights___________________


    var geometry = new THREE.SphereGeometry( 2, 8, 8 );
    var material = new THREE.MeshLambertMaterial( {color: 0xFF0040} );
    var sphere1 = new THREE.Mesh( geometry, material );
    scene.add( sphere1 );

    var geometry = new THREE.SphereGeometry(2, 8, 8 );
    var material = new THREE.MeshLambertMaterial( {color: 0x0040FF} );
    var sphere2 = new THREE.Mesh( geometry, material );
    scene.add( sphere2 );

    var geometry = new THREE.SphereGeometry( 2, 8, 8 );
    var material = new THREE.MeshLambertMaterial( {color: 0x00FF00} );
    var sphere3 = new THREE.Mesh( geometry, material );
    scene.add( sphere3 );

    var geometry = new THREE.SphereGeometry( 2, 8, 8 );
    var material = new THREE.MeshLambertMaterial( {color: 0xffaa00} );
    var sphere4 = new THREE.Mesh( geometry, material );
    scene.add( sphere4 );


    var geometry = new THREE.SphereGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( {color: 0xFF1493} );
    var sphere5 = new THREE.Mesh( geometry, material );
    sphere5.scale.set(0.2,0.2,0.2);
    scene.add( sphere5 );

    var geometry = new THREE.SphereGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( {color: 0x00BFFF} );
    var sphere6 = new THREE.Mesh( geometry, material );
    sphere6.scale.set(0.2,0.2,0.2);
    scene.add( sphere6 );

//________________________Model loader/Avatar________________________________________
              var avatar2 = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
              var loader = new THREE.ObjectLoader();


              loader.load ( 'json/space-shuttle.json',

                    function (object)
                    {
                        avatar2 = object;
                        avatar2.scale.set (5,5,5);
                        avatar2.position.set (0,-2,0);
                        avatar2.rotateY(0);
                        avatar2.castShadow = true;
                        avatar2.add( sphere5, sphere6, light6, light7);
                        scene.add (avatar2);
                        cube.mesh.add(avatar2);
                    }
                  );

//________________________Camera Following Avatar______________

      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / innerHeight, 0.1, 1000000 );
      
      camera.position.z = cube.mesh.position.z + 75;
      camera.position.x = cube.mesh.position.x + 0; 
      camera.position.y = cube.mesh.position.y + 15;
      cube.mesh.add(camera);


//______________________FOG_______________________
//scene.fog = new THREE.Fog (0xA0A0A0, 0.5, 0.0025);
//renderer.setClearColor (0xA0A0A0, 0);

//_______________________orbit controls__________________________
    controls = new THREE.OrbitControls(camera, renderer.domElement);

//___________________________skybox______________________________
    var geometry = new THREE.CubeGeometry (100000,100000,100000);
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

//___________________________Lighting___________________________

    var ambientLight = new THREE.AmbientLight (0xFFFFFF, 0.1);
    scene.add (ambientLight);

      //Point Lights
          var light1 = new THREE.PointLight( 0xff0040, 2, 80 );
          light1.position.copy(camera.position)
          scene.add( light1 );

          var light2 = new THREE.PointLight( 0x0040ff, 2, 80 );
          scene.add( light2 );

          var light3 = new THREE.PointLight( 0x00FF00, 2, 80 );
          scene.add( light3 );

          var light4 = new THREE.PointLight( 0xffaa00, 2, 80 );
          scene.add( light4 );

          var light6 = new THREE.PointLight( 0xFF1493, 1, 100 );
          scene.add( light6 );

          var light7 = new THREE.PointLight( 0x00BFFF, 1, 100 );
          scene.add( light7 );

//___________________________Ring Lights____________________________
          var light5 = new THREE.PointLight( 0xFFFFFF, 3, 200, 100 );
              light5.intensity = 20;
              scene.add( light5 );

//________________________white Spotlight_____________________________

          var spotLight = new THREE.SpotLight( 0xffffff, 1 );
                  spotLight.position.set( 100, 1000, 100 );

                  spotLight.castShadow = true;

                  spotLight.shadow.mapSize.width = 100;
                  spotLight.shadow.mapSize.height = 10000;

                  spotLight.shadow.camera.near = 500;
                  spotLight.shadow.camera.far = 4000;
                  spotLight.shadow.camera.fov = 30;

                  scene.add (spotLight);

//___________________________Particle System________________________
var particleSystem;

init();
function createParticleSystem() {

    var particleCount = 10000;

    var particles = new THREE.Geometry();

    // Create the vertices and add them to the particles geometry
    for (var p = 0; p < particleCount; p++) {

        var x = Math.random() * 30000 - 15000;
        var y = Math.random() * 30000 - 15000;
        var z = Math.random() * 30000 - 15000;

        var particle = new THREE.Vector3(x, y, z);

        // Add the vertex to the geometry
        particles.vertices.push(particle);
    }

    var particleMaterial = new THREE.PointsMaterial(
            { //color: 0xffffff,
             size: 1,
             map: THREE.TextureLoader("img/stars.png"),
             blending: THREE.AdditiveBlending,
             transparent: true,
            });

    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);

    return particleSystem;
}


function init() {

    particleSystem = createParticleSystem();
    scene.add(particleSystem);


}

function animateParticles() {
    var verts = particleSystem.geometry.vertices;
    for(var i = 0; i < verts.length; i++) {
        var vert = verts[i];
        if (vert.y < -2000) {
            vert.y = Math.random() * 4000 - 2000;
        }
        vert.y = vert.y - (1 * deltaTime);
    }
    particleSystem.geometry.verticesNeedUpdate = true;

}

//_______________________Sound__________________________
var listener = new THREE.AudioListener();
camera.add( listener );

var sound = new THREE.Audio( listener );

var audioLoader = new THREE.AudioLoader();

audioLoader.load( 'music/space.mp3', function( buffer ) {
  sound.setBuffer( buffer );
  sound.setLoop( true );
  sound.setVolume( 0.2 );
  sound.play();
});


//________________update method & game logic_______________
var update = function()
{

         //lighting movement
        var time = Date.now() * 0.0020;

            light1.position.x = Math.sin (time * 0.7) * 40;
            light1.position.y = Math.cos (time * 0.5) * 50;
            light1.position.z = Math.cos (time * 0.3) * 40;

            light2.position.x = Math.cos (time * 0.3) * 40;
            light2.position.y = Math.sin (time * 0.5) * 50;
            light2.position.z = Math.sin (time * 0.7) * 40;

            light3.position.x = Math.sin (time * 0.7) * 40;
            light3.position.y = Math.cos (time * 0.3) * 50;
            light3.position.z = Math.sin (time * 0.5) * 40;

            light4.position.x = Math.sin (time * 0.5) * 40;
            light4.position.y = Math.cos (time * 0.3) * 50;
            light4.position.z = Math.sin (time * 0.7) * 40;

            light6.position.x = Math.sin (time * 1.7) * 2;
            light6.position.y = Math.cos (time * 1.3) * 2;
            light6.position.z = Math.sin (time * 1.5) * 2;

            light7.position.x = Math.sin (time * 1.5) * 2;
            light7.position.y = Math.cos (time * 1.3) * 2;
            light7.position.z = Math.sin (time * 1.7) * 2;

            //Ring light
            light5.position.x = Math.sin (time * 0.008) * 400;
            light5.position.y = Math.cos (time * 0.008) * 500;
            light5.position.z = Math.sin (time * 0.008) * 400;


            sphere1.position.x = Math.sin (time * 0.7) * 40;
            sphere1.position.y = Math.cos (time * 0.5) * 50;
            sphere1.position.z = Math.cos (time * 0.3) * 40;

            sphere2.position.x = Math.cos (time * 0.3) * 40;
            sphere2.position.y = Math.sin (time * 0.5) * 50;
            sphere2.position.z = Math.sin (time * 0.7) * 40;

            sphere3.position.x = Math.sin (time * 0.7) * 40;
            sphere3.position.y = Math.cos (time * 0.3) * 50;
            sphere3.position.z = Math.sin (time * 0.5) * 40;

            sphere4.position.x = Math.sin (time * 0.5) * 40;
            sphere4.position.y = Math.cos (time * 0.3) * 50;
            sphere4.position.z = Math.sin (time * 0.7) * 40;

            sphere5.position.x = Math.sin (time * 1.7) * 2;
            sphere5.position.y = Math.cos (time * 1.3) * 2;
            sphere5.position.z = Math.sin (time * 1.5) * 2;

            sphere6.position.x = Math.sin (time * 1.5) * 2;
            sphere6.position.y = Math.cos (time * 1.3) * 2;
            sphere6.position.z = Math.sin (time * 1.7) * 2;

            
//________________________GAME FLOW MOVEMENT

/*var taking_input = false;

 if ( taking_input == true ) {
    return //? ;
  } else {
    return //? ;
  }     */      


//________________________Movement code_____________________
document.addEventListener("keydown", onDocumentKeyDown, true);
  function onDocumentKeyDown(event) {
    var keyCode = event.keyCode;
};

  var delta = clock.getDelta(); // seconds.
  var moveDistance = 200 * delta; // 200 pixels per second
  var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second 



 // move forwards/backwards/left/right
  if ( keyboard.pressed("R") )
    cube.mesh.translateZ( -moveDistance );
  if ( keyboard.pressed("F") )
    cube.mesh.translateZ(  moveDistance );
  if ( keyboard.pressed("B") ) //boost
    cube.mesh.translateZ( 3 * -moveDistance );
  if ( keyboard.pressed("N") ) //super boost
    cube.mesh.translateZ( 8 * -moveDistance );
  /*if ( keyboard.pressed("E") )
    avatar.translateX(  moveDistance );*/   

  // rotate left/right/up/down
  var rotation_matrix = new THREE.Matrix4().identity();
  if ( keyboard.pressed("A") )
    cube.mesh.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
  if ( keyboard.pressed("D") )
    cube.mesh.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
  if ( keyboard.pressed("W") )
    cube.mesh.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
  if ( keyboard.pressed("S") )
    cube.mesh.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
  if ( keyboard.pressed("E") )
    cube.mesh.rotateOnAxis( new THREE.Vector3(0,0,0.5), -rotateAngle);
  if ( keyboard.pressed("Q") )
    cube.mesh.rotateOnAxis( new THREE.Vector3(0,0,-0.5), -rotateAngle); 

  if ( keyboard.pressed("Z") )
  {
    //cube.mesh.position(0,0,0);
    //cube.mesh.rotation(0,0,0);
  } 


//___________________________Spotlight__________________________________
        spotLight.target = cube.mesh;
};

//________________________________Draw Scene__________________________
var render = function()
{
      renderer.render (scene, camera);
      

}; 
render();


// run game loop (update, render, repeat)
var GameLoop = function()
{
       requestAnimationFrame (GameLoop);
       requestAnimationFrame(render);


 update();
 //render();
 //animate();

};

GameLoop();


function animate() {
  requestAnimationFrame( animate );
  gameFlow.Update();
  cube.Update();
  renderer.render( scene, camera );

  for (obj of objects) {
       obj.Update();
  }
  
}
animate();


