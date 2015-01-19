import CSSRenderableBase			= require("awayjs-display/lib/pool/CSSRenderableBase");
import IRenderablePool				= require("awayjs-display/lib/pool/IRenderablePool");
import Skybox						= require("awayjs-display/lib/entities/Skybox");


/**
 * @class away.pool.CSSSkyboxRenderable
 */
class CSSSkyboxRenderable extends CSSRenderableBase
{
	public static id:string = "skybox";

	constructor(pool:IRenderablePool, skyBox:Skybox)
	{
		super(pool, skyBox, skyBox);

		var div:HTMLDivElement = <HTMLDivElement> document.createElement("div");
		div.onmousedown = (event:MouseEvent) => false;

		this.htmlElement = div;

		var style:MSStyleCSSProperties = div.style;
		var img:HTMLDivElement;

		//create the six images that make up the skybox
		style.position = "absolute";
		style.transformOrigin
			= style["-webkit-transform-origin"]
			= style["-moz-transform-origin"]
			= style["-o-transform-origin"]
			= style["-ms-transform-origin"] = "0% 0%";

		img = <HTMLDivElement> document.createElement("div");

		div.appendChild(img);

		img.className = "material" + skyBox.id;
	}
}

export = CSSSkyboxRenderable;