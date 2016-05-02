/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-04 15:59:36
 * @version $Id$
 */


        function drawShape() {

            // create a basic shape
            var shape = new THREE.Shape();

            // startpoint
            shape.moveTo(10, 10);

            // straight line upwards
            shape.lineTo(10, 40);

            // the top of the figure, curve to the right
            shape.bezierCurveTo(15, 25, 25, 25, 30, 40);

            // spline back down
            shape.splineThru(
                    [new THREE.Vector2(32, 30),
                        new THREE.Vector2(28, 20),
                        new THREE.Vector2(30, 10),
                    ]);

            // curve at the bottom
            shape.quadraticCurveTo(20, 15, 10, 10);

            // add 'eye' hole one
            var hole1 = new THREE.Path();
            hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true);
            shape.holes.push(hole1);

            // add 'eye hole 2'
            var hole2 = new THREE.Path();
            hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true);
            shape.holes.push(hole2);

            // add 'mouth'
            var hole3 = new THREE.Path();
            hole3.absarc(20, 16, 2, 0, Math.PI, true);
            shape.holes.push(hole3);

            // return the shape
            return shape;
        }
Geometry=(function(){
	var Three=init(document.body);
	   	scene=Three.scene,
		camera=Three.camera,
		ambientLight=Three.ambientLight,
		spotLight=Three.spotLight,
		plane=Three.plane,
		stat=Three.stat,
		gui=new dat.GUI(),
		renderer=Three.renderer;

	function test(){
		renderer.render(scene,camera);
		requestAnimationFrame(test);
	}

	function createMesh(geometry){
		var meshMaterial=new THREE.MeshNormalMaterial({color:0xff0000});
		meshMaterial.side=THREE.DoubleSide;
		var wireFrameMaterial=new THREE.MeshBasicMaterial({
			wireframe:true,
		});

		var mesh=new THREE.SceneUtils.createMultiMaterialObject(geometry,[meshMaterial,wireFrameMaterial]);
		return mesh;
	}

	function erweifn(){
		var planeGeometry=new THREE.PlaneBufferGeometry(10,10);
		var plane=createMesh(planeGeometry);
		plane.position.set(0,10,0);
		scene.add(plane);
		var ctrl={
			rotation:0,
			width:10,
			height:10,
			widthSegment:1,
			heightSegment:1,
			redraw:function(){
				scene.remove(plane);
				var planeGeometry=new THREE.PlaneBufferGeometry(ctrl.width,ctrl.height,Math.round(ctrl.widthSegment),Math.round(ctrl.heightSegment));
				plane=createMesh(planeGeometry);
				plane.position.set(0,10,0);
				scene.add(plane);
			}
		}

		gui.add(ctrl,'rotation',0,2*Math.PI).onChange(function(e){
			plane.rotation.y=e;
		});

		gui.add(ctrl,'width',0,100).onChange(function(e){
			ctrl.redraw()
		})

		gui.add(ctrl,'height',0,100).onChange(function(e){
			ctrl.redraw()
		})

		gui.add(ctrl,'widthSegment',0,10).onChange(ctrl.redraw);
		gui.add(ctrl,'heightSegment',0,10).onChange(ctrl.redraw);

		test()
	}

	function circlePlanefn(){
		var circleGeometry=new THREE.CircleGeometry(5,10);
		var circle=createMesh(circleGeometry);
		circle.position.set(0,10,0);
		scene.add(circle);
		var ctrl={
			radius:3,
			segments:10,
			thetaStart:0,
			thetaLength:2*Math.PI,
			rotation:0,
			redraw:function(){
				scene.remove(circle);
				circleGeometry=new THREE.CircleGeometry(this.radius,this.segments,this.thetaStart,this.thetaLength);
				circle=createMesh(circleGeometry);
				circle.position.set(0,10,0);
				circle.rotation.set(0,this.rotation,0);
				scene.add(circle)
			}
		}
		gui.add(ctrl,'radius',0,100).onChange(function(e){
			ctrl.redraw();
		});

		gui.add(ctrl,'rotation',0,2*Math.PI).onChange(function(e){
			circle.rotation.set(0,e,0);
		});

		gui.add(ctrl,'segments',3,100).onChange(function(e){
			ctrl.redraw();
		});

		gui.add(ctrl,'thetaStart',0,2*Math.PI).onChange(function(e){
			ctrl.redraw();
		});

		gui.add(ctrl,'thetaLength',0,2*Math.PI).onChange(function(e){
			ctrl.redraw();
		})
		test();
	}

	function shapefn(){
		scene.remove(plane);
		var shape=new THREE.Shape();
		shape.moveTo(10,10);
		shape.lineTo(10,40);
		shape.bezierCurveTo(15, 25, 25, 25, 30, 40);
		shape.splineThru(
                    [new THREE.Vector2(32, 30),
                        new THREE.Vector2(28, 20),
                        new THREE.Vector2(30, 10),
                    ]);
		 shape.quadraticCurveTo(20, 15, 10, 10);

		             // add 'eye' hole one
        var hole1 = new THREE.Path();
        hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true);
        shape.holes.push(hole1);

        // add 'eye hole 2'
        var hole2 = new THREE.Path();
        hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true);
        shape.holes.push(hole2);

        var hole3 = new THREE.Path();
        hole3.absarc(20, 16, 2, 0, Math.PI, true);
        shape.holes.push(hole3);





		var shapeGeometry=new THREE.ShapeGeometry(shape);
		var mesh=createMesh(shapeGeometry);
		mesh.position.set(-15,-20,0);
		scene.add(mesh);
		test();
	}

	function cubefn(){
		var cube=createMesh(new THREE.BoxGeometry(10,10,10));
		cube.position.set(0,5,0);
		scene.add(cube);
		var ctrl={
			widthSegment:1,
			heightSegment:1,
			depthSegment:1,
			redraw:function(){
				scene.remove(cube);
				var width=Math.round(this.widthSegment),
					height=Math.round(this.heightSegment),
					depth=Math.round(this.depthSegment);

				cube=createMesh(new THREE.BoxGeometry(10,10,10,width,height,depth));
				cube.position.set(0,5,0);
				scene.add(cube);


			}
		}

		gui.add(ctrl,'widthSegment',1,10).onChange(function(e){
			ctrl.redraw();
		});

		gui.add(ctrl,'heightSegment',1,10).onChange(function(e){
			ctrl.redraw();
		});

		gui.add(ctrl,'depthSegment',1,10).onChange(function(e){
			ctrl.redraw();
		})
		test();
	}

	function spherefn(){
		scene.remove(plane);
		var sphere=createMesh(new THREE.SphereGeometry(10));
		sphere.position.set(0,7,0);
		scene.add(sphere);
		var ctrl={
			widthSegment:8,
			heightSegment:6,
			rotationy:0,
			rotationz:0,
			phiStart:0,
			phiLength:2*Math.PI,
			thetaStart:0,
			thetaLength:2*Math.PI,
			redraw:function(){
				var width=Math.round(this.widthSegment);
				var height=Math.round(this.heightSegment);
				scene.remove(sphere);
				var sphereGeometry=new THREE.SphereGeometry(10,width,height,this.phiStart,this.phiLength,this.thetaStart,this.thetaLength);
				sphere=createMesh(sphereGeometry);
				sphere.position.set(0,7,0);
				scene.add(sphere);
			}
		}

		gui.add(ctrl,'widthSegment',3,100).onChange(function(e){
			ctrl.redraw();
		});
		gui.add(ctrl,'heightSegment',2,100).onChange(function(e){
			ctrl.redraw();
		});
		gui.add(ctrl,'rotationy',0,10).onChange(function(e){
			sphere.rotation.y=e;
		});
		gui.add(ctrl,'rotationz',0,10).onChange(function(e){
			sphere.rotation.z=e;
		});
		gui.add(ctrl,'phiStart',0,2*Math.PI).onChange(function(e){
			ctrl.redraw();
		});

		gui.add(ctrl,'phiLength',0,2*Math.PI).onChange(function(e){
			ctrl.redraw();
		});

		gui.add(ctrl,'thetaStart',0,2*Math.PI).onChange(function(e){
			ctrl.redraw();
		});

		gui.add(ctrl,'thetaLength',0,2*Math.PI).onChange(function(e){
			ctrl.redraw();
		})

		test();

	}

	return {
		test:test,
		erwei:erweifn,
		circlePlane:circlePlanefn,
		shape:shapefn,
		cube:cubefn,
		sphere:spherefn
	}


})();
