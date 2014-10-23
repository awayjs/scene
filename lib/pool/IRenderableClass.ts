import IMaterialOwner				= require("awayjs-display/lib/base/IMaterialOwner");
import IRenderable					= require("awayjs-display/lib/pool/IRenderable");
import RenderablePool				= require("awayjs-display/lib/pool/RenderablePool");

/**
 * IRenderableClass is an interface for the constructable class definition IRenderable that is used to
 * create renderable objects in the rendering pipeline to render the contents of a partition
 *
 * @class away.render.IRenderableClass
 */
interface IRenderableClass
{
	/**
	 *
	 */
	id:string;

	/**
	 *
	 */
	new(pool:RenderablePool, materialOwner:IMaterialOwner):IRenderable;
}

export = IRenderableClass;