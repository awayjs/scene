import IEntity						= require("awayjs-display/lib/display/IEntity");
import INode						= require("awayjs-display/lib/partition/INode");
import IRenderable					= require("awayjs-display/lib/base/IRenderable");
import Scene						= require("awayjs-display/lib/display/Scene");

/**
 * ITraverser is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.ITraverser
 */
interface ITraverser
{
	/**
	 *
	 * @param node
	 * @returns {boolean}
	 */
	enterNode(node:INode):boolean;

	/**
	 *
	 * @param entity
	 */
	applyDirectionalLight(entity:IEntity);

	/**
	 *
	 * @param entity
	 */
	applyEntity(entity:IEntity);

	/**
	 *
	 * @param entity
	 */
	applyRenderable(renderable:IRenderable);

	/**
	 *
	 * @param entity
	 */
	applyLightProbe(entity:IEntity);

	/**
	 *
	 * @param entity
	 */
	applyPointLight(entity:IEntity);

	/**
	 *
	 * @param entity
	 */
	applySkybox(entity:IEntity);
}

export = ITraverser;