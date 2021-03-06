(function(){

  var width = window.innerWidth,
      height = window.innerHeight;

  var button;

  //scene

  var scene = new THREE.Scene();

  //mesh

  var geometry = new THREE.SphereGeometry( 5, 60, 40 );
    geometry.scale( - 1, 1, 1 );

  //静止画
  imgPlay('img/img3_large.jpg');

  //camera

  var camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  camera.position.set(0,0,0.1);
  camera.lookAt(sphere.position);

  //helper

  var axis = new THREE.AxisHelper(1000);
  axis.position.set(0,0,0);
  scene.add(axis);

  //render

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width,height);
  renderer.setClearColor({color: 0x000000});
  document.getElementById('stage').appendChild(renderer.domElement);
  renderer.render(scene,camera);

  //control

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  function render(){
    requestAnimationFrame(render);
    window.addEventListener( 'resize', onWindowResize, false );
    renderer.render(scene,camera);

    button = document.getElementsByClassName("imgPlay");
    for(var i = 0; i < button.length; i++){
      button[i].addEventListener( 'click', imgSelect, false );
    }

    button = document.getElementsByClassName("videoPlay");
    for(var i = 0; i < button.length; i++){
      button[i].addEventListener( 'click', videoSelect, false );
    }
    controls.update();
  }
  render();
  function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

  function vidplay() {
    //imgPlay();

       if (video.paused) {
          video.play();
          button.textContent = "||";
          button.style.backgroundColor = "#F26964";
       } else {
          video.pause();
          button.textContent = ">";
          button.style.backgroundColor = "#1253A4";
       }
    }

  function videoSelect(){
    var path = ""
    if(this.textContent == "1"){
      path = 'img/SAM_101_0021.mp4';
    }
    else if(this.textContent == "2"){
      path = 'img/img2_large.jpg';
    }
    else{
      path = 'img/img3_large.jpg';
    }
    videoPlay(path);
  }

  function imgSelect(){
    var path = ""
    if(this.textContent == "1"){
      path = 'img/SAM_101_0099.jpg';
    }
    else if(this.textContent == "2"){
      path = 'img/img2_large.jpg';
    }
    else{
      path = 'img/img3_large.jpg';
    }
    imgPlay(path);
  }

  function videoPlay(path){
    var video = document.createElement( 'video' );
    video.width = 640;
    video.height = 360;
    video.autoplay = true;
    video.loop = true;
    video.src = path;

    var texture = new THREE.VideoTexture( video );
    texture.minFilter = THREE.LinearFilter;

    var material   = new THREE.MeshBasicMaterial( { map : texture } );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
  }

  function imgPlay(path){
    var material = new THREE.MeshBasicMaterial( {
       map: THREE.ImageUtils.loadTexture( path )
    } );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
  }

})();
