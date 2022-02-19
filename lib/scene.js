export class Scene
{
	constructor()
	{
		this.primitives = []
	}

	add(primitive)
	{
		if( this.primitives && primitive )
		{
			this.primitives.push(primitive)
		}
	}

	centroid()
	{
		// Return the centroid as per the requirements of mode-2
		let maxX = -1, minX = 1;
		let maxY = -1, minY = 1;
		for (let primitive in this.primitives){
			let xy  = this.primitives[primitive].getCentroid()
			let x = xy[0]
			let y = xy[1]

			if(x >= maxX){
				maxX = x
			}
			if(x <= minX){
				minX = x
			}
			if(y >= maxY){
				maxY = y
			}
			if(y <= minY){
				minY = y
			}
		}
		let centroidX = (maxX + minX) / 2;
		let centroidY = (maxY + minY) / 2;
		
		return [centroidX, centroidY]
	}
}
