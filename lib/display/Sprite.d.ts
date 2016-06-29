import { ITraverser } from "../ITraverser";
import { IAnimator } from "../animators/IAnimator";
import { Graphics } from "../graphics/Graphics";
import { DisplayObjectContainer } from "../display/DisplayObjectContainer";
import { MaterialBase } from "../materials/MaterialBase";
import { Style } from "../base/Style";
/**
 * Sprite is an instance of a Graphics, augmenting it with a presence in the scene graph, a material, and an animation
 * state. It consists out of Graphices, which in turn correspond to SubGeometries. Graphices allow different parts
 * of the graphics to be assigned different materials.
 */
export declare class Sprite extends DisplayObjectContainer {
    private static _sprites;
    static assetType: string;
    private _center;
    _graphics: Graphics;
    private _onGraphicsInvalidateDelegate;
    private _tempPoint;
    /**
     *
     */
    readonly assetType: string;
    /**
     * Specifies the Graphics object belonging to this Sprite object, where
     * drawing commands can occur.
     */
    readonly graphics: Graphics;
    /**
     * Defines the animator of the graphics object.  Default value is <code>null</code>.
     */
    animator: IAnimator;
    /**
     * The material with which to render the Sprite.
     */
    material: MaterialBase;
    /**
     *
     */
    style: Style;
    /**
     * Create a new Sprite object.
     *
     * @param material    [optional]        The material with which to render the Sprite.
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
    clone(): Sprite;
    copyTo(sprite: Sprite): void;
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
