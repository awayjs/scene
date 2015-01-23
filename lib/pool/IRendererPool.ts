import LineSubMesh					= require("awayjs-display/lib/base/LineSubMesh");
import TriangleSubMesh				= require("awayjs-display/lib/base/TriangleSubMesh");
import Billboard					= require("awayjs-display/lib/entities/Billboard");

/**
 * IRenderer is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.IRenderer
 */
interface IRendererPool
{
	/**
	 *
	 * @param billboard
	 */
	applyBillboard(billboard:Billboard);

	/**
	 *
	 * @param triangleSubMesh
	 */
	applyLineSubMesh(triangleSubMesh:LineSubMesh);

	/**
	 *
	 * @param triangleSubMesh
	 */
	applyTriangleSubMesh(triangleSubMesh:TriangleSubMesh);
}

export = IRendererPool;