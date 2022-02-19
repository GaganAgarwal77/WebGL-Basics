import { mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export class WebGLRenderer
{
	constructor()
	{
		this.domElement = document.createElement("canvas");		

		this.gl = this.domElement.getContext("webgl") || this.domElement.getContext("experimental-webgl");
		if (!this.gl) throw new Error("WebGL is not supported");

		this.setSize(50,50);
		this.clear(1.0,1.0,1.0,1.0);
	}	

	setSize(width, height)
	{
		this.domElement.width = width;
		this.domElement.height = height;
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	clear(r,g,b,a)
	{
		this.gl.clearColor(r, g, b, a);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}

	setAnimationLoop(animation) 
	{
		function renderLoop()
		{
			animation();
			window.requestAnimationFrame(renderLoop);
		}	

		renderLoop();
		  
	}
	
	drawBoundary(shader, boundaryColor){ // draws boundary for our 2 frames
		let vertexPostitions = new Float32Array([
			//  x , y,  z 
			-1, 1, 0.0,
			1, 1, 0.0,
			1, -1, 0.0,
			-1, -1, 0.0,
		]);		
		shader.bindArrayBuffer(shader.vertexAttributesBuffer, vertexPostitions);

		shader.fillAttributeData("aPosition", vertexPostitions, 3,  3 * vertexPostitions.BYTES_PER_ELEMENT, 0);		
				
		shader.setUniform4f("uColor", boundaryColor);
		shader.setUniformMatrix4fv("matrix", mat4.identity(mat4.create()));
		
		// Draw
		shader.drawLoop(4);
	}
	render(scene, shader,drawX, drawY, drawWidth, drawHeight,boundaryColor) 
	{
		this.gl.viewport(drawX, drawY, drawWidth, drawHeight);
		this.gl.scissor(drawX, drawY, drawWidth, drawHeight);
		this.gl.enable(this.gl.SCISSOR_TEST);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.drawBoundary(shader,boundaryColor)


		scene.primitives.forEach(function (primitive) {
			primitive.transform.updateModelTransformMatrix();

			shader.bindArrayBuffer(shader.vertexAttributesBuffer, primitive.vertexPositions);
			shader.fillAttributeData("aPosition", primitive.vertexPositions, 3,  3 * primitive.vertexPositions.BYTES_PER_ELEMENT, 0);		
					
			shader.setUniform4f("uColor", primitive.color);		
			shader.setUniformMatrix4fv("matrix",primitive.transform.modelTransformMatrix);
			
			// Draw shapes
			shader.drawArrays(primitive.vertexPositions.length / 3);
								
		});
	}

	glContext()
	{
		return this.gl;
	}

	mouseToClipCoord(mouseX,mouseY,resolution=[this.domElement.width,this.domElement.height]) {
		let clipX,clipY;

		clipX = mouseX / resolution[0];
		clipY = mouseY / resolution[1];

		clipX = (clipX * 2) - 1;
		clipY = (clipY * 2) - 1;

		clipY *= - 1; 

		return [clipX, clipY]
	}
}