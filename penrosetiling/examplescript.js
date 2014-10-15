			$(function() {
				var PHI = 0.5 + Math.sqrt(5 / 4),
					canvas = document.getElementById("canvas1").getContext("2d");
				
				function degToRad(degrees) {
					return degrees * (Math.PI / 180);
				}
				
				function dist(point1, point2) {
					//return a somewhat rounded number, so we can use it in comparisons
					return Math.round(Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)) * 100000) / 100000;
				}
				
				function rotateAndResize(origin, point, angle, resizeFactor) {
					angle = degToRad(angle);
					resizeFactor = resizeFactor || 1;
					
					return [
						Math.cos(angle) * ((point[0] - origin[0]) * resizeFactor) - Math.sin(angle) * ((point[1] - origin[1]) * resizeFactor) + origin[0],
						Math.sin(angle) * ((point[0] - origin[0]) * resizeFactor) + Math.cos(angle) * ((point[1] - origin[1]) * resizeFactor) + origin[1]
					];
				}
				
				function substituteKite(coordinates) {
					var top, bottom, left, right,
						distAB = dist(coordinates[0], coordinates[1]),
						distBC = dist(coordinates[1], coordinates[2]),
						distCD = dist(coordinates[2], coordinates[3]);
					
					//find the orientation
					if(distAB < distBC) {
						top = coordinates[0];
						right = coordinates[1];
						bottom = coordinates[2];
						left = coordinates[3];
					} else if(distAB > distBC) {
						top = coordinates[2];
						right = coordinates[3];
						bottom = coordinates[0];
						left = coordinates[1];
					} else if(distBC < distCD) {
						top = coordinates[1];
						right = coordinates[2];
						bottom = coordinates[3];
						left = coordinates[0];
					} else {
						top = coordinates[3];
						right = coordinates[0];
						bottom = coordinates[1];
						left = coordinates[2];
					}
					
					return [{
						coordinates: [
							left,
							top,
							rotateAndResize(left, top, 36),
							rotateAndResize(left, top, 72)
						],
						type: "kite"
					}, {
						coordinates: [
							top,
							right,
							rotateAndResize(right, top, -72),
							rotateAndResize(right, top, -36)
						],
						type: "kite"
					}, {
						coordinates: [
							rotateAndResize(left, top, 108),
							rotateAndResize(left, top, 72),
							rotateAndResize(left, top, 36),
							bottom
						],
						type: "dart"
					}, {
						coordinates: [
							rotateAndResize(right, top, -36),
							rotateAndResize(right, top, -72),
							rotateAndResize(right, top, -108),
							bottom
						],
						type: "dart"
					}];
				}
				
				function substituteDart(coordinates) {
					var top, bottom, left, right,
						distAB = dist(coordinates[0], coordinates[1]),
						distBC = dist(coordinates[1], coordinates[2]),
						distCD = dist(coordinates[2], coordinates[3]);
					
					//find the orientation
					if(distAB > distBC) {
						top = coordinates[0];
						right = coordinates[1];
						bottom = coordinates[2];
						left = coordinates[3];
					} else if(distAB < distBC) {
						top = coordinates[2];
						right = coordinates[3];
						bottom = coordinates[0];
						left = coordinates[1];
					} else if(distBC > distCD) {
						top = coordinates[1];
						right = coordinates[2];
						bottom = coordinates[3];
						left = coordinates[0];
					} else {
						top = coordinates[3];
						right = coordinates[0];
						bottom = coordinates[1];
						left = coordinates[2];
					}
					
					return [{
						coordinates: [
							right,
							bottom,
							rotateAndResize(right, bottom, 36, 1 / PHI),
							rotateAndResize(right, bottom, 72)
						],
						type: "dart"
					}, {
						coordinates: [
							bottom,
							left,
							rotateAndResize(left, bottom, -72),
							rotateAndResize(left, bottom, -36, 1 / PHI)
						],
						type: "dart"
					}, {
						coordinates: [
							rotateAndResize(right, bottom, 36, 1 / PHI),
							bottom,
							rotateAndResize(left, bottom, -36, 1 / PHI),
							top
						],
						type: "kite"
					}];
				}
				
				function draw(shapes, xOffset, yOffset) {
					var i = 0,
						shape, j;
					
					canvas.lineWidth = 0.25;
					canvas.strokeStyle = "#f8f8f8";
					canvas.lineJoin = "round";
					
					setInterval(function() {
						if(i < shapes.length) {
							shape = shapes[i];
							j = 0;
							
							//canvas.fillStyle = shape.type === "kite" ? "#333333" : "#D61F3B";
							//canvas.fillStyle = "hsl(0, 50%, " + Math.random() * 100 + "%)";
							
							if(shape.type === "dart") {
								//canvas.fillStyle = "hsl(351, 75%, " + (Math.random() * 50 + 25) + "%)";
								//canvas.fillStyle = "hsl(" + shape.coordinates[0][0] + ", 0%, 50%)";
								//canvas.fillStyle = "hsl(0, 50%, " + (100 - shape.coordinates[0][0] / 9) + "%)";
								//canvas.fillStyle = "hsl(0, 50%, " + (100 - dist(shape.coordinates[0], [450, 450]) / 4.5) + "%)";
								//canvas.fillStyle = "white";
								canvas.fillStyle = "hsl(0, 50%, " + (Math.random() * 30 + 35) + "%)";
								//canvas.fillStyle = "#c0c0c0";
								//canvas.fillStyle = "hsl(" + (Math.random() * 360) + ", 50%, 70%)";
							} else {
								//canvas.fillStyle = "hsl(0, 0%, " + (Math.random() * 20 + 10) + "%)";
								//canvas.fillStyle = "hsl(" + shape.coordinates[0][0] + ", 50%, 50%)";
								//canvas.fillStyle = "hsl(0, 50%, " + (shape.coordinates[0][0] / 9) + "%)";
								//canvas.fillStyle = "hsl(0, 50%, " + dist(shape.coordinates[0], [450, 450]) / 4.5 + "%)";
								//canvas.fillStyle = "black";
								canvas.fillStyle = "hsl(210, 50%, " + (Math.random() * 30 + 35) + "%)";
								//canvas.fillStyle = "#c0c0c0";
								//canvas.fillStyle = "hsl(" + (Math.random() * 360) + ", 50%, 70%)";
							}
							
							canvas.beginPath();
							
							while(j < shape.coordinates.length) {
								if(j > 0) {
									canvas.lineTo(shape.coordinates[j][0] + xOffset, shape.coordinates[j][1] + yOffset);
								} else {
									canvas.moveTo(shape.coordinates[j][0] + xOffset, shape.coordinates[j][1] + yOffset);
								}
								j++;
							}
							
							canvas.closePath();
							canvas.fill();
							canvas.stroke();
						}
						i++;
					}, 20);
				}
				
				function iterate(iterations, scale) {
					var initial = [],
						tmp = [],
						ret = [],
						i;
					
					initial.push({
						coordinates: [
							[Math.cos(degToRad(54)) * (scale / PHI), Math.sin(degToRad(54)) * (scale / PHI)],
							[Math.cos(degToRad(18)) * scale, Math.sin(degToRad(18)) * scale],
							[Math.cos(degToRad(18)) * scale * 2 - Math.cos(degToRad(54)) * (scale / PHI), Math.sin(degToRad(54)) * (scale / PHI)],
							[Math.cos(degToRad(18)) * scale, Math.sin(degToRad(54)) * scale * PHI]
						],
						type: "kite"
					});
					
					ret = ret.concat(initial);
					
					while(iterations-- > 0) {
						for(i = 0; i < initial.length; i++) {
							if(initial[i].type === "dart") {
								tmp = tmp.concat(substituteDart(initial[i].coordinates));
							} else {
								tmp = tmp.concat(substituteKite(initial[i].coordinates));
							}
						}
						initial = tmp;
						ret = ret.concat(tmp);
						tmp = [];
					}
					
					return ret;
				}
				
				draw(iterate(6, 500), 0, 0);
			});
			
// taken from http://daandeschepper.nl/penrose
