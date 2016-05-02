/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-03 14:49:17
 * @version $Id$
 */
var Material=(function(){
	var Three=init(document.body);
	   	scene=Three.scene,
		camera=Three.camera,
		ambientLight=Three.ambientLight,
		spotLight=Three.spotLight,
		plane=Three.plane,
		stat=Three.stat,
		gui=new dat.GUI(),
		renderer=Three.renderer;

	var cubeGeometry=new THREE.BoxGeometry(5,5,5);
	var plane2Geometry=new THREE.PlaneBufferGeometry(10,20);
	var sphereGeometry=new THREE.SphereGeometry(10,20,20);
	var cube,plane2,obj,sphere;

	function test(){
		stat.update();
		obj.rotation.y+=0.01;
		renderer.render(scene,camera);
		requestAnimationFrame(test);
	}

	function basicfn(){
		var cubeMaterial=new THREE.MeshBasicMaterial({
			color:0xffff00
		});

		plane2=new THREE.Mesh(plane2Geometry,cubeMaterial);
		cube=new THREE.Mesh(cubeGeometry,cubeMaterial);

		plane2.position.set(0,10,0);
		cube.position.set(0,10,0);

		
		scene.add(cube);
		obj=cube;
		var ctrl={
			opacity:1,
			transparent:false,
			wireframe:false,
			wireframeLineWidth:1,
			color:0xffff00,
			visible:true,
			selectMesh:'cube',
			side:'front'
		}

		gui.add(ctrl,'opacity',0,1).onChange(function(e){
			cubeMaterial.opacity=e;
		});

		gui.add(ctrl,'transparent').onChange(function(e){
			cubeMaterial.transparent=e;
		});

		gui.add(ctrl,'wireframe').onChange(function(e){
			cubeMaterial.wireframe=e;
		});
		gui.add(ctrl,'wireframeLineWidth',1,10).onChange(function(e){
			cubeMaterial.wireframeLinewidth=e;
		});
		gui.addColor(ctrl,'color').onChange(function(e){
			cubeMaterial.color=new THREE.Color(e);
		});
		gui.add(ctrl,'visible').onChange(function(e){
			cubeMaterial.visible=e;
		});

		gui.add(ctrl,'selectMesh',['cube','plane2']).onChange(function(e){
			scene.remove(cube);
			scene.remove(plane2);

			switch(e){
				case 'cube':
					scene.add(cube);
					obj=cube;
					break;

				case 'plane2':
					scene.add(plane2);
					obj=plane2;
					break;
			}
		})

		gui.add(ctrl,'side',['front','back','double']).onChange(function(e){
			switch(e){
				case 'front':
					cubeMaterial.side=THREE.FrontSide;
					break;

				case 'back':
					cubeMaterial.side=THREE.BackSide;
					break;

				case 'double':
					cubeMaterial.side=THREE.DoubleSide;
					break;
			}
		})


		test();
	}

	function depthfn(){
		// scene.overrideMaterial=new THREE.MeshDepthMaterial();

		ambientLight.visible=false;
		spotLight.visible=false;
		plane.visible=false;
		var colorMaterial=new THREE.MeshBasicMaterial({
			color:0x00ff00,
			transparent:true,
			blending:THREE.MultiplyBlending
		});
		var cubeMaterial=new THREE.MeshDepthMaterial();
		cube=new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry,[colorMaterial,cubeMaterial]);
		// cube.children[1].scale.set(0.99,0.99,0.99);
		obj=cube;

		cube.position.set(0,10,0);
		scene.add(cube);
		var ctrl={
			x:0,
			y:0,
			z:0,
			cameraNear:0,
			cameraFar:0
		}
		gui.add(ctrl,'x',-50,50).onChange(function(e){
			cube.position.x=e;
		});

		gui.add(ctrl,'y',-50,50).onChange(function(e){
			cube.position.y=e;
		});

		gui.add(ctrl,'z',-50,50).onChange(function(e){
			cube.position.z=e;
		});

		gui.add(ctrl,'cameraNear',0,50).onChange(function(e){
			camera.near=e;
		});

		gui.add(ctrl,'cameraFar',50,200).onChange(function(e){
			camera.far=e;
		});

		// renderer.render(scene,camera);





		test();

	}

	function normalfn(){
		var Material=new THREE.MeshNormalMaterial({color:0x000000});
		sphere=new THREE.Mesh(sphereGeometry,Material);
		sphere.position.set(0,5,0);
		scene.add(sphere);
		obj=sphere;
		var ctrl={
			shading:'float'
		}
		gui.add(ctrl,'shading',['float','smooth']).onChange(function(e){
			switch (e){
				case 'float':
					Material.shading=THREE.FlatShading;
					break;

				case 'smooth':
					Material.shading=THREE.SmoothShading;
					break;
			}

			scene.remove(sphere);
			sphere=new THREE.Mesh(sphere.geometry.clone(),Material);
			sphere.position.set(0,5,0);
			obj=sphere;

			scene.add(sphere);
			Material.needsUpdate = true;
		})
		test();
	}

	function facefn(){
		var mats = [];
        mats.push(new THREE.MeshBasicMaterial({color: 0x009e60}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xff0000}));
        mats.push(new THREE.MeshBasicMaterial({color: 0x00ff00}));
        mats.push(new THREE.MeshBasicMaterial({color: 0x0051ba}));
        mats.push(new THREE.MeshBasicMaterial({color: 0x0000ff}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xffd500}));

        var meshMaterial=new THREE.MeshFaceMaterial(mats);

        var group=new THREE.Mesh();

        for(var x=0;x<3;x++){
        	for(var y=0;y<3;y++){
        		for(var z=0;z<3;z++){
        			var cubeGeom=new THREE.BoxGeometry(4.9,4.9,4.9);
        			var cube=new THREE.Mesh(cubeGeom,meshMaterial);
        			cube.position=new THREE.Vector3(x*5-5,y*5,z*5-5);
        			group.add(cube);
        		}
        	}
        }

        obj=group;
        scene.add(group);

        // cube=new THREE.Mesh(cubeGeometry,meshMaterial);
        // cube.position.set(0,5,0);
        // scene.add(cube);
        // obj=cube;
        test();
	}

    function lambertfn(){
    	var meshMaterial=new THREE.MeshLambertMaterial({
    		color:0x7777ff
    	});

    	var meshMaterial2=new THREE.MeshPhongMaterial({
    		color:0x7777ff
    	});



    	cube=new THREE.Mesh(cubeGeometry,meshMaterial);
    	sphere=new THREE.Mesh(sphereGeometry,meshMaterial2);

    	cube.position.set(0,5,0);
    	sphere.position.set(0,5,0);
    	obj=sphere;
    	scene.add(cube);
    	scene.add(sphere);
    	test();

    	var ctrl={
    		ambient:0xffffff,
    		emissive:0x000000,
    		specular:0xffffff,
    		shininess:30
    	}

    	gui.addColor(ctrl,'ambient').onChange(function(e){
    		meshMaterial.ambient=new THREE.Color(e);
    	});

    	gui.addColor(ctrl,'emissive').onChange(function(e){
    		meshMaterial.emissive=new THREE.Color(e);
    	});

    	gui.addColor(ctrl,'specular').onChange(function(e){
    		meshMaterial2.specular=new THREE.Color(e);
    	});

    	gui.add(ctrl,'shininess',0,100).onChange(function(e){
    		meshMaterial2.shininess=e;
    	})
    }

    function linefn(){
    	var points=gosper(4,60);
    	var lines=new THREE.Geometry();
    	var colors=[];
    	var i=0;
    	points.forEach(function(e){
    		lines.vertices.push(new THREE.Vector3(e.x,e.z,e.y));
    		colors[i]=new THREE.Color(0xffffff);
    		colors[i].setHSL(e.x/100+0.5,(e.y*20)/300,0.8);
    		i++;
    	})
    	lines.colors=colors;
    	var lineMaterial=new THREE.LineBasicMaterial({
    		opacity:1,
    		linewidth:1,
    		vertexColors:THREE.VertexColors
    	})

    	var line=new THREE.Line(lines,lineMaterial);
    	line.position.set(0,10,0);
    	scene.add(line);
    	obj=line;
    	test();
    }






	return {
		test:test,
		basic:basicfn,
		depth:depthfn,
		normal:normalfn,
		face:facefn,
		lambert:lambertfn,
		line:linefn
	}
})()


















