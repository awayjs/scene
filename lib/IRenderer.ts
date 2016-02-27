import IEventDispatcher				= require("awayjs-core/lib/events/IEventDispatcher");
import Plane3D						= require("awayjs-core/lib/geom/Plane3D");
import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import Rectangle					= require("awayjs-core/lib/geom/Rectangle");

import ITraverser					= require("awayjs-display/lib/ITraverser");
import Camera						= require("awayjs-display/lib/display/Camera");
import Scene						= require("awayjs-display/lib/display/Scene");

/**
 * IRenderer is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.IRenderer
 */
interface IRenderer extends ITraverser, IEventDispatcher
{
	cullPlanes:Array<Plane3D>

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
	render(camera:Camera, scene:Scene);

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

	_iRender(camera:Camera, scene:Scene, target?:ImageBase, scissorRect?:Rectangle, surfaceSelector?:number);

	_iRenderCascades(camera:Camera, scene:Scene, target:ImageBase, numCascades:number, scissorRects:Array<Rectangle>, cameras:Array<Camera>);
}

export = IRenderer;