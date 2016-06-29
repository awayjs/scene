import { ITraverser } from "../ITraverser";
import { IAnimator } from "../animators/IAnimator";
import { DisplayObject } from "../display/DisplayObject";
import { Graphics } from "../graphics/Graphics";
import { MaterialBase } from "../materials/MaterialBase";
import { Style } from "../base/Style";
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
export declare class Shape extends DisplayObject {
    private static _shapes;
    static assetType: string;
    private _center;
    private _graphics;
    private _onGraphicsInvalidateDelegate;
    private _tempPoint;
    /**
     *
     */
    readonly assetType: string;
    /**
     * Specifies the Graphics object belonging to this Shape object, where
     * drawing commands can occur.
     */
    readonly graphics: Graphics;
    /**
     * Defines the animator of the graphics object.  Default value is <code>null</code>.
     */
    animator: IAnimator;
    /**
     * The material with which to render the Shape.
     */
    material: MaterialBase;
    /**
     *
     */
    style: Style;
    /**
     * Create a new Shape object.
     *
     * @param material    [optional]        The material with which to render the Shape.
     */
    constructor(material?: MaterialBase);
    /**
     *
     */
    bakeTransformations(): void;
    /**
     * @inheritDoc
     */
    dispose(): void;
    /**
     * @inheritDoc
     */
    disposeValues(): void;
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
    clone(): Shape;
    copyTo(shape: Shape): void;
    /**
     * //TODO
     *
     * @protected
     */
    _pUpdateBoxBounds(): void;
    _pUpdateSphereBounds(): void;
    /**
     * //TODO
     *
     * @private
     */
    private _onGraphicsInvalidate(event);
    /**
     *
     * @param renderer
     *
     * @internal
     */
    _acceptTraverser(traverser: ITraverser): void;
    _hitTestPointInternal(x: number, y: number, shapeFlag: boolean, masksFlag: boolean): boolean;
    clear(): void;
}
