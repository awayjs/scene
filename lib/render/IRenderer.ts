import IEventDispatcher				= require("awayjs-core/lib/events/IEventDispatcher");
import Rectangle					= require("awayjs-core/lib/geom/Rectangle");

import IEntitySorter				= require("awayjs-display/lib/sort/IEntitySorter");
import ICollector					= require("awayjs-display/lib/traverse/ICollector");
import Camera						= require("awayjs-display/lib/entities/Camera");
import Skybox						= require("awayjs-display/lib/entities/Skybox");
import TextureProxyBase				= require("awayjs-core/lib/textures/TextureProxyBase");

/**
 * IRenderer is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.IRenderer
 */
interface IRenderer extends IEventDispatcher
{
	/**
	 *
	 */
	renderableSorter:IEntitySorter;

	/**
	 *
	 */
	shareContext:boolean;

	/**
	 *
	 */
	x:number /*uint*/;

	/**
	 *
	 */
	y:number /*uint*/;

	/**
	 *
	 */
	width:number /*uint*/;

	/**
	 *
	 */
	height:number /*uint*/;

	/**
	 *
	 */
	viewPort:Rectangle;

	/**
	 *
	 */
	scissorRect:Rectangle;

	/**
	 *
	 */
	dispose();

	/**
	 *
	 * @param entityCollector
	 */
	render(entityCollector:ICollector);

	/**
	 * @internal
	 */
	_iBackgroundR:number /*uint*/;

	/**
	 * @internal
	 */
	_iBackgroundG:number /*uint*/;

	/**
	 * @internal
	 */
	_iBackgroundB:number /*uint*/;

	/**
	 * @internal
	 */
	_iBackgroundAlpha:number;

	/**
	 * @internal
	 */
	_iCreateEntityCollector():ICollector;

	_iRender(entityCollector:ICollector, target?:TextureProxyBase, scissorRect?:Rectangle, surfaceSelector?:number);

	_iRenderCascades(entityCollector:ICollector, target:TextureProxyBase, numCascades:number, scissorRects:Array<Rectangle>, cameras:Array<Camera>)
}

export = IRenderer;