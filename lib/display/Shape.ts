import {AssetEvent}					from "@awayjs/core/lib/events/AssetEvent";
import {Box}							from "@awayjs/core/lib/geom/Box";
import {Point}						from "@awayjs/core/lib/geom/Point";
import {Vector3D}						from "@awayjs/core/lib/geom/Vector3D";

import {TraverserBase}					from "@awayjs/graphics/lib/base/TraverserBase";
import {IAnimator}					from "@awayjs/graphics/lib/animators/IAnimator";
import {Graphics}						from "@awayjs/graphics/lib/Graphics";
import {MaterialBase}					from "@awayjs/graphics/lib/materials/MaterialBase";
import {Style}						from "@awayjs/graphics/lib/base/Style";
import {Transform}					from "@awayjs/graphics/lib/base/Transform";

import {DisplayObject}				from "../display/DisplayObject";

/**
 * This class is used to create lightweight shapes using the ActionScript
 * drawing application program interface(API). The Shape class includes a
 * <code>graphics</code> property, which lets you access methods from the
 * Graphics class.
 *
 * <p>The Shape class also includes a <code>graphics</code>property, and it
 * includes other features not available to the Shape class. For example, a
 * Shape object is a display object container, whereas a Shape object is not
 * (and cannot contain child display objects). For this reason, Shape objects
 * consume less memory than Shape objects that contain the same graphics.
 * However, a Shape object supports user input events, while a Shape object
 * does not.</p>
 */
export class Shape extends DisplayObject
{
	private static _shapes:Array<Shape> = new Array<Shape>();

	public static assetType:string = "[asset Shape]";

	private _center:Vector3D;
	private _graphics:Graphics;
	private _onGraphicsInvalidateDelegate:(event:AssetEvent) => void;

	//temp point used in hit testing
	private _tempPoint:Point = new Point();

	/**
	 *
	 */
	public get assetType():string
	{
		return Shape.assetType;
	}

	/**
	 * Specifies the Graphics object belonging to this Shape object, where
	 * drawing commands can occur.
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
		this._graphics.animator = value;
	}

	/**
	 * The material with which to render the Shape.
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
	 * Create a new Shape object.
	 *
	 * @param material    [optional]        The material with which to render the Shape.
	 */
	constructor(material:MaterialBase = null)
	{
		super();

		this._onGraphicsInvalidateDelegate = (event:AssetEvent) => this._onGraphicsInvalidate(event);

		this._graphics = new Graphics(this); //unique graphics object for each Sprite
		this._graphics.addEventListener(AssetEvent.INVALIDATE, this._onGraphicsInvalidateDelegate);

		this.material = material;
	}

	/**
	 *
	 */
	public bakeTransformations():void
	{
		this._graphics.applyTransformation(this.transform.matrix3D);
		this.transform.clearMatrix3D();
	}

	/**
	 * @inheritDoc
	 */
	public dispose():void
	{
		this.disposeValues();

		Shape._shapes.push(this);
	}

	/**
	 * @inheritDoc
	 */
	public disposeValues():void
	{
		super.disposeValues();

		this._graphics.dispose();
	}

	/**
	 * Clones this Shape instance along with all it's children, while re-using the same
	 * material, graphics and animation set. The returned result will be a copy of this shape,
	 * containing copies of all of it's children.
	 *
	 * Properties that are re-used (i.e. not cloned) by the new copy include name,
	 * graphics, and material. Properties that are cloned or created anew for the copy
	 * include subShapees, children of the shape, and the animator.
	 *
	 * If you want to copy just the shape, reusing it's graphics and material while not
	 * cloning it's children, the simplest way is to create a new shape manually:
	 *
	 * <code>
	 * var clone : Shape = new Shape(original.graphics, original.material);
	 * </code>
	 */
	public clone():Shape
	{
		var newInstance:Shape = (Shape._shapes.length)? Shape._shapes.pop() : new Shape();

		this.copyTo(newInstance);

		return newInstance;
	}

	public copyTo(shape:Shape):void
	{
		super.copyTo(shape);

		this._graphics.copyTo(shape.graphics);
	}

	/**
	 * //TODO
	 *
	 * @protected
	 */
	public _pUpdateBoxBounds():void
	{
		super._pUpdateBoxBounds();

		this._pBoxBounds.union(this._graphics.getBoxBounds(), this._pBoxBounds);
	}


	public _pUpdateSphereBounds():void
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
	private _onGraphicsInvalidate(event:AssetEvent):void
	{
		if (this._pIsEntity != Boolean(this._graphics.count)) {
			if (this._pScene)
				this._pScene._iUnregisterObject(this);

			this._pIsEntity = Boolean(this._graphics.count);

			if (this._pScene)
				this._pScene._iRegisterObject(this);
		}

		this._pInvalidateBounds();
	}

	/**
	 *
	 * @param renderer
	 *
	 * @internal
	 */
	public _acceptTraverser(traverser:TraverserBase):void
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

		return false;
	}

	public clear():void
	{
		super.clear();

		this._graphics.clear();
	}
}