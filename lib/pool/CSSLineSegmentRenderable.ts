import CSSRenderableBase			= require("awayjs-display/lib/pool/CSSRenderableBase");
import RenderablePool				= require("awayjs-display/lib/pool/RenderablePool");
import LineSegment					= require("awayjs-display/lib/entities/LineSegment");

/**
 * @class away.pool.RenderableListItem
 */
class CSSLineSegmentRenderable extends CSSRenderableBase
{
	public static id:string = "lineSegment";

	constructor(pool:RenderablePool, lineSegment:LineSegment)
	{
		super(pool, lineSegment, lineSegment);

		var div:HTMLDivElement = <HTMLDivElement> document.createElement("div");
		div.onmousedown = (event:MouseEvent) => false;

		this.htmlElement = div;

		var style:MSStyleCSSProperties = div.style;

		style.position = "absolute";
		style.transformOrigin
			= style["-webkit-transform-origin"]
			= style["-moz-transform-origin"]
			= style["-o-transform-origin"]
			= style["-ms-transform-origin"] = "0% 0%";

		var img:HTMLDivElement = <HTMLDivElement> document.createElement("div");

		div.appendChild(img);

		img.className = "material" + lineSegment.material.id;
	}
}

export = CSSLineSegmentRenderable;