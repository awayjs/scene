import ImageBase					= require("awayjs-core/lib/image/ImageBase");
import SamplerBase					= require("awayjs-core/lib/image/SamplerBase");
import Box							= require("awayjs-core/lib/geom/Box");
import Matrix						= require("awayjs-core/lib/geom/Matrix");
import Point						= require("awayjs-core/lib/geom/Point");
import Vector3D						= require("awayjs-core/lib/geom/Vector3D");

import ITraverser					= require("awayjs-display/lib/ITraverser");
import IAnimator					= require("awayjs-display/lib/animators/IAnimator");
import DisplayObject				= require("awayjs-display/lib/display/DisplayObject");
import Graphics						= require("awayjs-display/lib/graphics/Graphics");
import ElementsBase					= require("awayjs-display/lib/graphics/ElementsBase");
import GraphicsEvent				= require("awayjs-display/lib/events/GraphicsEvent");
import DisplayObjectContainer		= require("awayjs-display/lib/display/DisplayObjectContainer");
import IEntity						= require("awayjs-display/lib/display/IEntity");
import MaterialBase					= require("awayjs-display/lib/materials/MaterialBase");
import TextureBase					= require("awayjs-display/lib/textures/TextureBase");
import ElementsUtils				= require("awayjs-display/lib/utils/ElementsUtils");
import Style						= require("awayjs-display/lib/base/Style");
import StyleEvent					= require("awayjs-display/lib/events/StyleEvent");

/**
 * Sprite is an instance of a Graphics, augmenting it with a presence in the scene graph, a material, and an animation
 * state. It consists out of Graphices, which in turn correspond to SubGeometries. Graphices allow different parts
 * of the graphics to be assigned different materials.
 */
class Sprite extends DisplayObjectContainer implements IEntity
{
	private static _sprites:Array<Sprite> = new Array<Sprite>();

	public static assetType:string = "[asset Sprite]";

	private _center:Vector3D;
	public _graphics:Graphics;
	private _castsShadows:boolean = true;
	private _shareAnimationGraphics:boolean = true;

	public _onGraphicsBoundsInvalidDelegate:(event:GraphicsEvent) => void;

	//temp point used in hit testing
	private _tempPoint:Point = new Point();

	/**
	 *
	 */
	public get assetType():string
	{
		return Sprite.assetType;
	}

	/**
	 * Indicates whether or not the Sprite can cast shadows. Default value is <code>true</code>.
	 */
	public get castsShadows():boolean
	{
		return this._castsShadows;
	}

	public set castsShadows(value:boolean)
	{
		this._castsShadows = value;
	}

	/**
	 * The graphics used by the sprite that provides it with its shape.
	 */
	public get graphics():Graphics
	{
		if (this._iSourcePrefab)
			this._iSourcePrefab._iValidate();

		return this._graphics;
	}

	/**
	 * Defines the animator of the graphics object.  Default value is <code>null</code>.
	 */
	public get animator():IAnimator
	{
		return this._graphics.animator;
	}

	public set animator(value:IAnimator)
	{
		if (this._graphics.animator)
			this._graphics.animator.removeOwner(this);

		this._graphics.animator = value;

		if (this._graphics.animator)
			this._graphics.animator.addOwner(this);
	}

	/**
	 * The material with which to render the Sprite.
	 */
	public get material():MaterialBase
	{
		return this._graphics.material;
	}

	public set material(value:MaterialBase)
	{
		this._graphics.material = value;
	}

	/**
	 * Indicates whether or not the sprite share the same animation graphics.
	 */
	public get shareAnimationGraphics():boolean
	{
		return this._shareAnimationGraphics;
	}

	public set shareAnimationGraphics(value:boolean)
	{
		this._shareAnimationGraphics = value;
	}

	/**
	 *
	 */
	public get style():Style
	{
		return this._graphics.style;
	}

	public set style(value:Style)
	{
		this._graphics.style = value;
	}

	/**
	 * Create a new Sprite object.
	 *
	 * @param material    [optional]        The material with which to render the Sprite.
	 */
	constructor(material:MaterialBase = null)
	{
		super();

		this._pIsEntity = true;

		this._onGraphicsBoundsInvalidDelegate = (event:GraphicsEvent) => this.onGraphicsBoundsInvalid(event);

		this._graphics = new Graphics(); //unique graphics object for each Sprite
		this._graphics.addEventListener(GraphicsEvent.BOUNDS_INVALID, this._onGraphicsBoundsInvalidDelegate);

		this.material = material;
	}

	/**
	 *
	 */
	public bakeTransformations()
	{
		this._graphics.applyTransformation(this.transform.matrix3D);
		this.transform.clearMatrix3D();
	}

	/**
	 * @inheritDoc
	 */
	public dispose()
	{
		this.disposeValues();

		Sprite._sprites.push(this);
	}

	/**
	 * @inheritDoc
	 */
	public disposeValues()
	{
		super.disposeValues();

		this._graphics.dispose();
	}

	/**
	 * Clones this Sprite instance along with all it's children, while re-using the same
	 * material, graphics and animation set. The returned result will be a copy of this sprite,
	 * containing copies of all of it's children.
	 *
	 * Properties that are re-used (i.e. not cloned) by the new copy include name,
	 * graphics, and material. Properties that are cloned or created anew for the copy
	 * include subSpritees, children of the sprite, and the animator.
	 *
	 * If you want to copy just the sprite, reusing it's graphics and material while not
	 * cloning it's children, the simplest way is to create a new sprite manually:
	 *
	 * <code>
	 * var clone : Sprite = new Sprite(original.graphics, original.material);
	 * </code>
	 */
	public clone():Sprite
	{
		var newInstance:Sprite = (Sprite._sprites.length)? Sprite._sprites.pop() : new Sprite();

		this.copyTo(newInstance);

		return newInstance;
	}

	public copyTo(sprite:Sprite)
	{
		super.copyTo(sprite);

		sprite.castsShadows = this._castsShadows;
		sprite.shareAnimationGraphics = this._shareAnimationGraphics;

		this._graphics.copyTo(sprite.graphics);
    }

	/**
	 * //TODO
	 *
	 * @protected
	 */
	public _pUpdateBoxBounds()
	{
		super._pUpdateBoxBounds();

		this._pBoxBounds.union(this._graphics.getBoxBounds(), this._pBoxBounds);
	}


	public _pUpdateSphereBounds()
	{
		super._pUpdateSphereBounds();

		var box:Box = this.getBox();

		if (!this._center)
			this._center = new Vector3D();

		this._center.x = box.x + box.width/2;
		this._center.y = box.y + box.height/2;
		this._center.z = box.z + box.depth/2;

		this._pSphereBounds = this._graphics.getSphereBounds(this._center, this._pSphereBounds);
	}

	/**
	 * //TODO
	 *
	 * @private
	 */
	private onGraphicsBoundsInvalid(event:GraphicsEvent)
	{
		this._pInvalidateBounds();
	}

	/**
	 *
	 * @param renderer
	 *
	 * @internal
	 */
	public _acceptTraverser(traverser:ITraverser)
	{
		this.graphics.acceptTraverser(traverser);
	}

	public _hitTestPointInternal(x:number, y:number, shapeFlag:boolean, masksFlag:boolean):boolean
	{
		if(this._graphics.count) {
			this._tempPoint.setTo(x,y);
			var local:Point = this.globalToLocal(this._tempPoint, this._tempPoint);
			var box:Box;

			//early out for box test
			if(!(box = this.getBox()).contains(local.x, local.y, 0))
				return false;

			//early out for non-shape tests
			if (!shapeFlag)
				return true;

			//ok do the graphics thing
			if (this._graphics._hitTestPointInternal(local.x, local.y))
				return true;
		}

		return super._hitTestPointInternal(x, y, shapeFlag, masksFlag);
	}

	public clear()
	{
		super.clear();

		this._graphics.clear();
	}
}

export = Sprite;