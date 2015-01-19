import CSSRenderableBase			= require("awayjs-display/lib/pool/CSSRenderableBase");
import IRenderablePool				= require("awayjs-display/lib/pool/IRenderablePool");
import Billboard					= require("awayjs-display/lib/entities/Billboard");

/**
 * @class away.pool.RenderableListItem
 */
class CSSBillboardRenderable extends CSSRenderableBase
{
	public static id:string = "billboard";

	constructor(pool:IRenderablePool, billboard:Billboard)
	{
		super(pool, billboard, billboard);

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

		img.className = "material" + billboard.material.id;
	}
}

export = CSSBillboardRenderable;