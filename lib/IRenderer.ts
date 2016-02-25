import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import IEventDispatcher				= require("awayjs-core/lib/events/IEventDispatcher");
import Rectangle					= require("awayjs-core/lib/geom/Rectangle");

import IRenderable					= require("awayjs-display/lib/base/IRenderable");
import CollectorBase				= require("awayjs-display/lib/traverse/CollectorBase");
import Camera						= require("awayjs-display/lib/display/Camera");
import Skybox						= require("awayjs-display/lib/display/Skybox");

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
	render(entityCollector:CollectorBase);

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
	_iCreateEntityCollector():CollectorBase;

	_iRender(entityCollector:CollectorBase, target?:ImageBase, scissorRect?:Rectangle, surfaceSelector?:number);

	_iRenderCascades(entityCollector:CollectorBase, target:ImageBase, numCascades:number, scissorRects:Array<Rectangle>, cameras:Array<Camera>);

	_iApplyRenderable(renderable:IRenderable);
}

export = IRenderer;