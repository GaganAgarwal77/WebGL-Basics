import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export class Transform
{
	constructor()
	{
		this.translate = vec3.create();
		vec3.set(this.translate, 0, 0, 0);
		
		this.scale = vec3.create();
		vec3.set(this.scale, 1, 1, 1);
		
		this.rotationAngle = 0;
		this.rotationAxis = vec3.create();
		vec3.set(this.rotationAxis, 1, 0, 0);

		this.modelTransformMatrix = mat4.create();
		mat4.identity(this.modelTransformMatrix);

		this.updateModelTransformMatrix();
	}

	updateModelTransformMatrix()
	{
		var c = Math.cos(this.rotationAngle);
		var s = Math.sin(this.rotationAngle);
		let rotationMatrix = [
			c,-s, 0,0,
			s, c, 0,0,
			0, 0, 1,0,
			0,0,0,1
		  ];

		// 1. Reset the transformation matrix
		mat4.identity(this.modelTransformMatrix);
		// 2. Use the current transformations values to calculate the latest transformation matrix
		//Order matters
		mat4.translate(this.modelTransformMatrix, this.modelTransformMatrix, this.translate);
		mat4.rotate(this.modelTransformMatrix, this.modelTransformMatrix, this.rotationAngle, this.rotationAxis);
		// mat4.multiply(this.modelTransformMatrix,this.modelTransformMatrix,rotationMatrix)
		mat4.scale(this.modelTransformMatrix, this.modelTransformMatrix, this.scale);
	}
	
	setTranslate(translationVec) {
		this.translate = translationVec;
	}

	getTranslate() {
		return this.translate;
	}

	setScale(scalingVec) {
		this.scale = scalingVec;
	}

	getScale() {
		return this.scale;
	}

	setRotate(rotationAxis, rotationAngle) {
		this.rotationAngle = rotationAngle;
		this.rotationAxis = rotationAxis;
	}

	getRotate() {
		return this.rotationAngle;
	} 
}