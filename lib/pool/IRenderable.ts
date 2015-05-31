import IEntity						= require("awayjs-display/lib/entities/IEntity");

/**
 * IRenderable is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.IRenderable
 */
interface IRenderable
{
	/**
	 *
	 */
	next:IRenderable;

	/**
	 *
	 */
	sourceEntity:IEntity;

	/**
	 *
	 */
	renderId:number;

	/**
	 *
	 */
	renderOrderId:number;

	/**
	 *
	 */
	zIndex:number;

	/**
	 *
	 */
	dispose();

	/**
	 *
	 */
	invalidateGeometry();
}

export = IRenderable;