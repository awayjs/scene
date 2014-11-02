import Rectangle					= require("awayjs-core/lib/geom/Rectangle");
import Matrix3D						= require("awayjs-core/lib/geom/Matrix3D");
import IAsset						= require("awayjs-core/lib/library/IAsset");
import AbstractMethodError			= require("awayjs-core/lib/errors/AbstractMethodError");
import ArgumentError				= require("awayjs-core/lib/errors/ArgumentError");
import Event						= require("awayjs-core/lib/events/Event");
import IEventDispatcher				= require("awayjs-core/lib/events/IEventDispatcher");
import TextureProxyBase				= require("awayjs-core/lib/textures/TextureProxyBase");

import IAnimationSet				= require("awayjs-display/lib/animators/IAnimationSet");
import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import IStage						= require("awayjs-display/lib/base/IStage");
import BlendMode					= require("awayjs-display/lib/base/BlendMode");
import IMaterialPassData			= require("awayjs-display/lib/pool/IMaterialPassData");
import IRenderable					= require("awayjs-display/lib/pool/IRenderable");
import Camera						= require("awayjs-display/lib/entities/Camera");
import LightPickerBase				= require("awayjs-display/lib/materials/lightpickers/LightPickerBase");
import IRenderer					= require("awayjs-display/lib/render/IRenderer");

/**
 * MaterialPassBase provides an abstract base class for material shader passes. A material pass constitutes at least
 * a render call per required renderable.
 */
interface IMaterialPass extends IAsset
{
	/**
	 * Renders an object to the current render target.
	 *
	 * @private
	 */
	_iRender(pass:IMaterialPassData, renderable:IRenderable, stage:IStage, camera:Camera, viewProjection:Matrix3D);

	/**
	 * Sets the render state for the pass that is independent of the rendered object. This needs to be called before
	 * calling renderPass. Before activating a pass, the previously used pass needs to be deactivated.
	 * @param stage The Stage object which is currently used for rendering.
	 * @param camera The camera from which the scene is viewed.
	 * @private
	 */
	_iActivate(pass:IMaterialPassData, renderer:IRenderer, camera:Camera);

	/**
	 * Clears the render state for the pass. This needs to be called before activating another pass.
	 * @param stage The Stage used for rendering
	 *
	 * @private
	 */
	_iDeactivate(pass:IMaterialPassData, renderer:IRenderer);

	/**
	 * The light picker used by the material to provide lights to the material if it supports lighting.
	 *
	 * @see away.materials.LightPickerBase
	 * @see away.materials.StaticLightPicker
	 */
	lightPicker:LightPickerBase;
}

export = IMaterialPass;