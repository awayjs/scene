import {IEventDispatcher}				from "@awayjs/core/lib/events/IEventDispatcher";
import {Plane3D}						from "@awayjs/core/lib/geom/Plane3D";
import {Rectangle}					from "@awayjs/core/lib/geom/Rectangle";

import {ImageBase}					from "@awayjs/graphics/lib/image/ImageBase";

import {Camera}						from "./display/Camera";
import {IView}						from "./IView";

/**
 * IRenderer is an interface for classes that are used in the rendering pipeline to render the
 * contents of a partition
 *
 * @class away.render.IRenderer
 */
export interface IRenderer extends IEventDispatcher
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
	render(view:IView);

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

	_iRender(camera:Camera, view:IView, target?:ImageBase, scissorRect?:Rectangle, surfaceSelector?:number);

	_iRenderCascades(camera:Camera, view:IView, target:ImageBase, numCascades:number, scissorRects:Array<Rectangle>, cameras:Array<Camera>);
}