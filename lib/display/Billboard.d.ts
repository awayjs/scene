import { Rectangle } from "@awayjs/core/lib/geom/Rectangle";
import { ITraverser } from "../ITraverser";
import { IAnimator } from "../animators/IAnimator";
import { DisplayObject } from "../display/DisplayObject";
import { IRenderable } from "../base/IRenderable";
import { IEntity } from "../display/IEntity";
import { MaterialBase } from "../materials/MaterialBase";
import { Style } from "../base/Style";
import { IPickingCollider } from "../pick/IPickingCollider";
import { PickingCollision } from "../pick/PickingCollision";
/**
 * The Billboard class represents display objects that represent bitmap images.
 * These can be images that you load with the <code>flash.Assets</code> or
 * <code>flash.display.Loader</code> classes, or they can be images that you
 * create with the <code>Billboard()</code> constructor.
 *
 * <p>The <code>Billboard()</code> constructor allows you to create a Billboard
 * object that contains a reference to a Image2D object. After you create a
 * Billboard object, use the <code>addChild()</code> or <code>addChildAt()</code>
 * method of the parent DisplayObjectContainer instance to place the bitmap on
 * the display list.</p>
 *
 * <p>A Billboard object can share its Image2D reference among several Billboard
 * objects, independent of translation or rotation properties. Because you can
 * create multiple Billboard objects that reference the same Image2D object,
 * multiple display objects can use the same complex Image2D object without
 * incurring the memory overhead of a Image2D object for each display
 * object instance.</p>
 *
 * <p>A Image2D object can be drawn to the screen by a Billboard object in one
 * of two ways: by using the default hardware renderer with a single hardware surface,
 * or by using the slower software renderer when 3D acceleration is not available.</p>
 *
 * <p>If you would prefer to perform a batch rendering command, rather than using a
 * single surface for each Billboard object, you can also draw to the screen using the
 * <code>drawTiles()</code> or <code>drawTriangles()</code> methods which are
 * available to <code>flash.display.Tilesheet</code> and <code>flash.display.Graphics
 * objects.</code></p>
 *
 * <p><b>Note:</b> The Billboard class is not a subclass of the InteractiveObject
 * class, so it cannot dispatch mouse events. However, you can use the
 * <code>addEventListener()</code> method of the display object container that
 * contains the Billboard object.</p>
 */
export declare class Billboard extends DisplayObject implements IEntity, IRenderable {
    static assetType: string;
    private _animator;
    private _billboardWidth;
    private _billboardHeight;
    private _billboardRect;
    private _material;
    private _style;
    private _onInvalidatePropertiesDelegate;
    private onInvalidateTextureDelegate;
    /**
     * Defines the animator of the sprite. Act on the sprite's geometry. Defaults to null
     */
    readonly animator: IAnimator;
    /**
     *
     */
    readonly assetType: string;
    /**
     *
     */
    readonly billboardRect: Rectangle;
    /**
     *
     */
    readonly billboardHeight: number;
    /**
     *
     */
    readonly billboardWidth: number;
    /**
     *
     */
    material: MaterialBase;
    constructor(material: MaterialBase, pixelSnapping?: string, smoothing?: boolean);
    /**
     * @protected
     */
    _pUpdateBoxBounds(): void;
    clone(): DisplayObject;
    /**
     * The style used to render the current Billboard. If set to null, the default style of the material will be used instead.
     */
    style: Style;
    /**
     * //TODO
     *
     * @param shortestCollisionDistance
     * @returns {boolean}
     *
     * @internal
     */
    _iTestCollision(pickingCollision: PickingCollision, pickingCollider: IPickingCollider): boolean;
    /**
     * @private
     */
    private onInvalidateTexture(event);
    _acceptTraverser(traverser: ITraverser): void;
    private _updateDimensions();
    invalidateElements(): void;
    invalidateSurface(): void;
    private _onInvalidateProperties(event?);
}
