import {Transform} from './transform.js';

export class Square
{
	constructor(centerX, centerY, color)
	{
		this.vertexPositions = new Float32Array([
			//  x , y,  z 
			centerX - 0.2, centerY - 0.2, 0.0,
			centerX - 0.2, centerY + 0.2, 0.0,
			centerX + 0.2, centerY - 0.2, 0.0,
			centerX - 0.2, centerY + 0.2, 0.0,
			centerX + 0.2, centerY - 0.2, 0.0,
			centerX + 0.2, centerY + 0.2, 0.0,
		]);		
		this.cX = centerX
		this.cY = centerY
		this.color = color;
		this.transform = new Transform();
	}

	getCentroid(){
		let translate= this.transform.getTranslate()
		return [this.cX + translate[0],this.cY+translate[1]]
	}	
}