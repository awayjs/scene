import TriangleElements				= require("awayjs-display/lib/graphics/TriangleElements");

class ParticleData
{
	public particleIndex:number /*uint*/;
	public numVertices:number /*uint*/;
	public startVertexIndex:number /*uint*/;
	public elements:TriangleElements;
}

export = ParticleData