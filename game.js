var material = new THREE.MeshPhongMaterial();

//.background = (0xFFFFFF)
//varibles
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75,window.innerWidth/window.innerHeight,0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize( window.innerWidth,window.innerHeight );

//Create a WebGLRenderer and turn on shadows in the renderer
var geometry = new THREE.CylinderGeometry( 1, 1, 20, 32 );
var material = new THREE.MeshLambertMaterial( {color: 0x0000CC} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.position.x = 15;
cylinder.position.y = 0;
cylinder.position.z = -5;

scene.add( cylinder );

var geometry = new THREE.CylinderGeometry( 1, 1, 20, 32 );
var material = new THREE.MeshLambertMaterial( {color: 0x0000CC} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.position.x = -15;
cylinder.position.y = 0;
cylinder.position.z = -7;

scene.add( cylinder );


var geometry = new THREE.CylinderGeometry( 1, 1, 20, 32 );
var material = new THREE.MeshLambertMaterial( {color: 0x0000CC} );
var cylinder = new THREE.Mesh( geometry, material );
cylinder.position.x = 10;
cylinder.position.y = 0;
cylinder.position.z = -3;

scene.add( cylinder );


//loop to repeat cylinders
//var Obstacle = [

  //for ( var i = 1; i< 5; i++) {
        //var cylinder = new cylinder();
        //objects.push(cylinder);
      //}

//];


  
//Classes

class Entity {
     constructor() {
     }

     Update() {
     }

     Reset() {
     }
   }

class Obstacle extends Entity {
    	constructor() {
        super ();
        this.geometry = new THREE.CylinderGeometry( 5, 5, 29, 40);
        this.material = new THREE.MeshLambertMaterial( {color: 0xC0C0C0});
        this.Column = new THREE.Mesh (this.geometry, this.material);
        this.Column.position.x = Math.random() * (50- -50) + -50;
        this.Column.position.y = 0 * (Math.random() * (50- -50) + -50);
        this.Column.position.z = Math.random() * (30- -30) + -30;
        this.Column.castShadow = true;
        this.Column.receiveShadow = true;
        this.Column.collidable = true;


        scene.add (this.Column);


    	}

    	Reset() {
        super.Reset();
    	}

    	Update() {
        super.Update();
    	}
    }



      class Avatar extends Entity {
          	constructor(newMesh) {
          	super();
            this.geometry = new THREE.TorusKnotGeometry( 2.5, 0.75, 100, 100 );
            this.material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
            this.torusKnot = new THREE.Mesh(this.geometry, this.material );
            this.torusKnot.castShadow = true; //default is false
            this.torusKnot.receiveShadow = false; //default
            scene.add( this.torusKnot );


            this.torusKnot.position.x = - 0;
            this.torusKnot.position.y = 3;
            this.torusKnot.position.z = 0;
              }

              Reset() {
                  super.Reset();
              }

              Update() {
                  super.Update();

              }
          }
          var myAvatar = new Avatar();


          class Enviroment extends Entity {
     constructor(newMesh) {
       super();
       //plane
           this.planeGeometry = new THREE.PlaneGeometry(200, 200, 200);
           this.planeMaterial = new THREE.MeshLambertMaterial({color: 0x47476b, side:THREE.DoubleSide, wireframe: false });
           this.plane = new THREE.Mesh(this.planeGeometry,this.planeMaterial);
           this.plane.receiveShadow = true;
           scene.add(this.plane);




           this.plane.position.x = 0;
           this.plane.position.y = -1;
           this.plane.position.z = -3;
           this.plane.rotation.x = 5;
       }

       Reset() {
           super.Reset();
       }

       Update() {
           super.Update();

       }
   }
var myPlane = new Enviroment();
document.body.appendChild( renderer.domElement );



//Create a DirectionalLight and turn on shadows for the light
var light = new THREE.DirectionalLight( 0xffffff,  4, 1000 );
light.position.set( 2, 2, 2 ); 			//default; light shining from top
light.castShadow = true;
light.shadow.camera.right = 35;
light.shadow.camera.left = - 35;
light.shadow.camera.top = 35;
light.shadow.camera.bottom = - 35;
           // default false
scene.add( light );
//shadow

//Set up shadow properties for the light
light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0;    // default
light.shadow.camera.far = 1000;     // default


//fog

scene.fog = new THREE.FogExp2 (0xFFFFFF, 0.015);



camera.position.z = 15;








//movement for cube
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.keyCode;
    // up
    if (keyCode == 87) {
        myAvatar.torusKnot.position.y += 0.25;
        // down
    } else if (keyCode == 83) {
        myAvatar.torusKnot.position.y -= 0.25;
        // left
    } else if (keyCode == 65) {
        myAvatar.torusKnot.position.x -= 0.25;
        // right

    } else if (keyCode == 68) {
        myAvatar.torusKnot.position.x += 0.25;
        // space
      } else if (keyCode == 90) {
          myAvatar.torusKnot.position.z += 0.25;
          // space
        } else if (keyCode == 88) {
            myAvatar.torusKnot.position.z += -0.25;
            // space
    } else if (keyCode == 32) {
        myAvatar.this.torusKnot.position.x = 0.0;
        myAvatar.this.torusKnot.position.y = 0.0;
        myAvatar.this.torusKnot.position.z = 0.0;
    }
};
//cube class


//animations
var animate4 = function () {
          requestAnimationFrame( animate4 );

          //torusKnot.rotation.x += 0.01;
          //torusKnot.rotation.y += 0.01;

          renderer.render(scene, camera);
        };

        animate4();
