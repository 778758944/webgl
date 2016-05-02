/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-25 11:10:09
 * @version $Id$
 */
var Light=(function(){
	var Three=init(document.body);
	   	scene=Three.scene,
		camera=Three.camera,
		ambientLight=Three.ambientLight,
		spotLight=Three.spotLight,
		plane=Three.plane,
		renderer=Three.renderer;


	var cubeGeometry=new THREE.BoxGeometry(3,3,3);
	var cubeMaterial=new THREE.MeshLambertMaterial({
		color:0x0000ff
	});

	var cube=new THREE.Mesh(cubeGeometry,cubeMaterial);
	cube.position.set(-20,5,0);
	cube.castShadow=true;

	var sphereGeometry=new THREE.SphereGeometry(3,20,20);
	var sphereMaterial=new THREE.MeshLambertMaterial({
		color:0xff0000
	});
	var sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);
	sphere.castShadow=true;
	sphere.position.set(0,5,0);
	scene.add(sphere);
	scene.add(cube);
	step=0;
	var gui=new dat.GUI();
	var lightCtrl={
		ambientColor:0x0c0c0c,
		displaySpot:false,
		displayAmbient:false
	}


	gui.add(lightCtrl,'displaySpot').onChange(function(e){
		spotLight.visible=!e
	});

	gui.add(lightCtrl,'displayAmbient').onChange(function(e){
		ambientLight.visible=!e
	});



	function ani(){
		cube.rotation.x+=0.01;
		cube.rotation.y+=0.01;
		cube.rotation.z+=0.01;
		step+=0.01;
		sphere.position.x=20+(10*Math.cos(step));
    	sphere.position.y=2+(10*Math.abs(Math.sin(step)));
	}

	function ball(){
		var pGeometry=new THREE.SphereGeometry(0.2,10,10);
		var pMaterial=new THREE.MeshLambertMaterial({color:0xff0000});
		var p=new THREE.Mesh(pGeometry,pMaterial);
		p.position.y=10;
		scene.add(p);
		return p;
	}


	function test(){
		stat.update();
		ani();
		renderer.render(scene,camera);
		requestAnimationFrame(test);
	}

	function ambientfn(){
		gui.addColor(lightCtrl,'ambientColor').onChange(function(e){
			ambientLight.color=new THREE.Color(e);
		});
		test();
	}


	function pointfn(){
		var pointLight=new THREE.PointLight(0xccffcc);
		pointLight.distance=100;
		pointLight.position.y=10;
		scene.add(pointLight);
		var pointPos={
			x:0,
			y:0,
			z:0,
			intensity:1,
			distance:100
		}

		var pGeometry=new THREE.SphereGeometry(0.2,10,10);
		var pMaterial=new THREE.MeshLambertMaterial({color:0xff0000});
		var p=new THREE.Mesh(pGeometry,pMaterial);
		p.position.y=10;
		scene.add(p);

		var f=gui.addFolder('pointpos');
		f.add(pointPos,'x',-50,50).onChange(function(e){
			pointLight.position.x=pointPos.x;
			p.position.x=pointPos.x;
		});
		f.add(pointPos,'y',-50,50).onChange(function(e){
			pointLight.position.y=pointPos.y;
			p.position.y=pointPos.y;
		});
		f.add(pointPos,'z',-50,50).onChange(function(e){
			pointLight.position.z=pointPos.z;
			p.position.z=pointPos.z;
		});
		f.add(pointPos,'intensity',1,3).onChange(function(e){
			pointLight.intensity=pointPos.intensity;
		});
		f.add(pointPos,'distance',1,1000).onChange(function(e){
			//代表光线照射的距离
			pointLight.distance=pointPos.distance;
		});
		f.addColor(lightCtrl,'ambientColor').onChange(function(e){
			pointLight.color=new THREE.Color(e);
		})

		// pointLight.position.set(pointPos.x,pointPos.y,pointPos.z);
		test();
	}


	function spotfn(){
		spotLight.position.set(3,33,-10);
		spotLight.target=plane;
		spotLight.shadowCameraVisible=true;
		spotLight.shadowCameraNear=10;
		spotLight.shadowCameraFar=100;
		spotLight.shadowCameraFov=80;
		// spotLight.onlyShadow=true;
		var p=ball();
		p.position.set(3,33,-10);

		var control={
			target:'Plane',
			angel:0,
			distance:0,
			x:-40,
			y:60,
			z:-10,
			intensity:1,
			exponent:0,
			debug:true,
			shadowCameraNear:0,
			shadowCameraFar:0,
			shadowCameraFov:80
		}
		var f=gui.addFolder('spotLight');
		f.add(control,'target',['Plane','Sphere','Cube']).onChange(function(e){
			switch(e){
				case 'Plane':
				spotLight.target=plane;
				break;

				case 'Sphere':
				spotLight.target=sphere;
				break;

				case 'Cube':
				spotLight.target=cube;
				break;
			}
		});

		f.add(control,'angel',0,Math.PI).onChange(function(e){
			spotLight.angle=control.angel;
		});
		f.add(control,'distance',0,1000).onChange(function(e){
			spotLight.distance=control.distance;
		});
		f.add(control,'x',-40,100).onChange(function(e){
			p.position.x=e;
			spotLight.position.x=e;
		});
		f.add(control,'y',-40,100).onChange(function(e){
			p.position.y=e;
			spotLight.position.y=e;
		});
		f.add(control,'z',-40,100).onChange(function(e){
			p.position.z=e;
			spotLight.position.z=e;
		});
		f.add(control,'intensity',1,5).onChange(function(e){
			spotLight.intensity=e;
		})
		f.add(control,'exponent',0,100).onChange(function(e){
			//光线的衰减速度
			spotLight.exponent=e;
		})
		f.add(control,'debug').onChange(function(e){
			spotLight.shadowCameraVisible=e;
		})
		f.add(control,'shadowCameraNear',1,500).onChange(function(e){
			spotLight.shadowCameraNear=e;
		})
		f.add(control,'shadowCameraFar',1,500).onChange(function(e){
			spotLight.shadowCameraFar=e;
		})
		f.add(control,'shadowCameraFov',0,100).onChange(function(e){
			spotLight.shadowCameraFov=e;
		})

		test();
	}

	function directionfn(){
		spotLight.visible=false;
		var directionLight=new THREE.DirectionalLight({color:0x00ff00});
		directionLight.position.set(0,20,0);
		directionLight.castShadow=true;
		directionLight.shadowCameraVisible=true;
		directionLight.target=cube;
		directionLight.shadowCameraNear=2;
		directionLight.shadowCameraFar=30;
		directionLight.shadowCameraLeft=-5;
		directionLight.shadowCameraRight=5;
		directionLight.shadowCameraTop=5;
		directionLight.shadowCameraBottom=-5;
		scene.add(directionLight);
		test();
	}

	function hemifn(){
		var hemiLight=new THREE.HemisphereLight(0x0000ff,0x00ff00,0.6);
		hemiLight.position.set(0,100,0);
		var p=ball();
		p.position.set(0,100,0);
		scene.add(hemiLight);
		test();
		var ctrl={
			show:true,
			color:0xffffff,
			groundColor:0xffffff,
			intensity:1
		}
		var f=gui.addFolder('hemi');
		f.add(ctrl,'show').onChange(function(e){
			hemiLight.visible=e;
		});
		f.addColor(ctrl,'color').onChange(function(e){
			hemiLight.color=new THREE.Color(e);
		});
		f.addColor(ctrl,'groundColor').onChange(function(e){
			hemiLight.groundColor=new THREE.Color(e);
		});
		f.add(ctrl,'intensity').onChange(function(e){
			hemiLight.intensity=e;
		})


	}

	return {
		testShow:test,
		ambient:ambientfn,
		point:pointfn,
		spot:spotfn,
		direction:directionfn,
		hemi:hemifn
	}
})();
