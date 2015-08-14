import DisplayObject				= require("awayjs-display/lib/base/DisplayObject");
import Graphics						= require("awayjs-display/lib/draw/Graphics");

/**
 * This class is used to create lightweight shapes using the ActionScript
 * drawing application program interface(API). The Shape class includes a
 * <code>graphics</code> property, which lets you access methods from the
 * Graphics class.
 *
 * <p>The Sprite class also includes a <code>graphics</code>property, and it
 * includes other features not available to the Shape class. For example, a
 * Sprite object is a display object container, whereas a Shape object is not
 * (and cannot contain child display objects). For this reason, Shape objects
 * consume less memory than Sprite objects that contain the same graphics.
 * However, a Sprite object supports user input events, while a Shape object
 * does not.</p>
 */
class Shape extends DisplayObject
{
	private _graphics:Graphics;

	/**
	 * Specifies the Graphics object belonging to this Shape object, where vector
	 * drawing commands can occur.
	 */
	get graphics():Graphics
	{
		return this._graphics;
	}

	/**
	 * Creates a new Shape object.
	 */
	constructor()
	{
		super();
	}

	public clone():DisplayObject
	{
		var clone:Shape = new Shape();
		clone.pivot = this.pivot;
		clone._iMatrix3D = this._iMatrix3D;
		clone.name = name;
		clone.maskMode = this.maskMode;
		clone.masks = this.masks? this.masks.concat() : null;
		clone._graphics = this._graphics;
		return clone;
	}
}

export = Shape;