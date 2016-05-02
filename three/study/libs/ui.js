/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-21 10:20:36
 * @version $Id$
 */
function initStat(){
	var stat=new Stats();
	stat.setMode(0);
	stat.domElement.style.position='absolute';
	stat.domElement.style.left=0;
	stat.domElement.style.top=0;
	document.body.appendChild(stat.domElement);
	return stat;
}

function init(ele,r_width,r_height,r_color){
	var width=r_width||window.innerWidth;
	var height=r_height||window.innerHeight;
	var color=r_color||0xeeeeee;
	stat=initStat();

	var scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
	scene.add(camera);

	var renderer=new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000);
	renderer.setSize(width,height);
	renderer.shadowMapEnabled=true;

	var axes=new THREE.AxisHelper(50);
    scene.add(axes);

	//create the ground plane
	var planeGeometry=new THREE.PlaneBufferGeometry(60,40,1,1);
	var planeMaterial=new THREE.MeshPhongMaterial({color:0xffffff});
	var plane=new THREE.Mesh(planeGeometry,planeMaterial);

	plane.receiveShadow=true;
	plane.rotation.x=-0.5*Math.PI;
	plane.position.x=0;
	plane.position.y=0;
	plane.position.z=0;

	scene.add(plane);

	camera.position.x=-30;
	camera.position.y=40;
	camera.position.z=30;
	camera.lookAt(scene.position);

	//添加光源
	var ambientLight=new THREE.AmbientLight(0x0c0c0c);
	scene.add(ambientLight);

	var spotLight=new THREE.SpotLight(0xffffff);
	spotLight.position.set(-40,60,-10);
	spotLight.castShadow=true;
	scene.add(spotLight);

	ele.appendChild(renderer.domElement);
	// renderer.render(scene,camera);

	return {
		stat:stat,
		renderer:renderer,
		scene:scene,
		camera:camera,
		plane:plane,
		ambientLight:ambientLight,
		spotLight:spotLight
	}
}


































