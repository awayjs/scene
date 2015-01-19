import IRenderableOwner				= require("awayjs-display/lib/base/IRenderableOwner");
import IRenderObject				= require("awayjs-display/lib/pool/IRenderObject");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import Skybox						= require("awayjs-display/lib/entities/Skybox");

/**
 * IRenderPass provides an abstract base class for material shader passes. A material pass constitutes at least
 * a render call per required renderable.
 */
interface IRenderablePool
{
	getMaterialRenderObject(material:MaterialBase):IRenderObject

	getSkyboxRenderObject(skybox:Skybox):IRenderObject

	disposeItem(renderableOwner:IRenderableOwner);
}

export = IRenderablePool;