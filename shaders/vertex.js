export const vertexShaderSrc = `      
	attribute vec3 aPosition;
	uniform mat4 matrix;
	void main () {             
		gl_Position = matrix * vec4(aPosition, 1.0); 
	}                          
`;